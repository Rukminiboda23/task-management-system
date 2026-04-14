# tasks/views.py

from bson import ObjectId
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .custom_auth import CustomJWTAuthentication
from .mongo import tasks_collection
from datetime import datetime
from rest_framework import status

class TaskListCreate(APIView):
    # This is correct: use your custom authentication
    authentication_classes = [CustomJWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Fetches tasks for the logged-in user.
        Handles both integer and string owner IDs for robustness.
        """
        tasks = []
        user_id = request.user.id
        
        # This is your excellent, robust query. We are keeping it.
        query = {"$or": [{"owner": user_id}, {"owner": str(user_id)}]}
        
        for task in tasks_collection.find(query):
            task["_id"] = str(task["_id"])
            tasks.append(task)
        
        return Response(tasks)

    def post(self, request):
        """
        Creates a new task for the logged-in user, storing the owner as an integer.
        """
        data = request.data.copy()
        data["owner"] = request.user.id  # This is correct
        data["created_at"] = datetime.utcnow().isoformat()
        
        result = tasks_collection.insert_one(data)
        
        new_task = tasks_collection.find_one({"_id": result.inserted_id})
        if new_task:
            new_task["_id"] = str(new_task["_id"])
        
        return Response(new_task, status=status.HTTP_201_CREATED)

    def delete(self, request, id):
        """
        Deletes a task owned by the logged-in user.
        """
        try:
            # This is correct, it checks for integer owner ID
            result = tasks_collection.delete_one({
                "_id": ObjectId(id),
                "owner": request.user.id
            })

            if result.deleted_count == 0:
                return Response({"error": "Task not found or you don't have permission"}, status=status.HTTP_404_NOT_FOUND)

            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
    def put(self, request, id):
        """
        Updates a task owned by the logged-in user.
        """
        try:
            data = request.data
            data.pop('_id', None)
            data.pop('owner', None) 
            data["updated_at"] = datetime.utcnow().isoformat()

            # This is correct, it checks for integer owner ID
            result = tasks_collection.update_one(
                {"_id": ObjectId(id), "owner": request.user.id},
                {"$set": data}
            )

            if result.matched_count == 0:
                return Response({"error": "Task not found or you don't have permission"}, status=status.HTTP_404_NOT_FOUND)

            updated_task = tasks_collection.find_one({"_id": ObjectId(id)})
            if updated_task:
                updated_task["_id"] = str(updated_task["_id"])

            return Response(updated_task)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)