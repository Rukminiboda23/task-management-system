# tasks/tests.py

from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status
from .mongo import tasks_collection 

User = get_user_model()

class TaskAPITestCase(APITestCase):

    def setUp(self):
        """This method runs BEFORE each test."""
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.client.force_authenticate(user=self.user)

    def tearDown(self):
        """This method runs AFTER each test to ensure a clean database."""
        tasks_collection.delete_many({})

    def test_authenticated_access(self):
        """Test if authenticated users can access the tasks list."""
        # Insert a task specifically for this test
        tasks_collection.insert_one({'title': 'Test Task', 'owner': str(self.user.id)})
        
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['title'], 'Test Task')

    def test_unauthenticated_access(self):
        """Test if unauthenticated users are denied access."""
        self.client.force_authenticate(user=None) # Log out
        response = self.client.get('/api/tasks/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
    
    def test_task_creation(self):
        """Test if an authenticated user can create a task."""
        # The database is clean before this test starts
        new_task_data = {'title': 'New Task', 'description': 'Another one'}
        response = self.client.post('/api/tasks/', new_task_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        
        # We now expect exactly 1 task to be in the database
        self.assertEqual(tasks_collection.count_documents({}), 1)
        
        # Verify the created task's data
        created_task = tasks_collection.find_one({})
        self.assertEqual(created_task['title'], 'New Task')