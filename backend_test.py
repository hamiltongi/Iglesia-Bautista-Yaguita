#!/usr/bin/env python3
"""
Backend API Tests for Iglesia Bautista Yaguita de Pastor
Tests all backend endpoints according to test_result.md priorities
"""

import requests
import json
import sys
from datetime import datetime
import uuid

# Configuration
BACKEND_URL = "https://continue-ai.preview.emergentagent.com/api"

class BackendTester:
    def __init__(self):
        self.results = {
            "total_tests": 0,
            "passed": 0,
            "failed": 0,
            "errors": []
        }
        
    def log_result(self, test_name, success, message="", response_data=None):
        """Log test result"""
        self.results["total_tests"] += 1
        if success:
            self.results["passed"] += 1
            print(f"✅ {test_name}: {message}")
        else:
            self.results["failed"] += 1
            self.results["errors"].append(f"{test_name}: {message}")
            print(f"❌ {test_name}: {message}")
            if response_data:
                print(f"   Response: {response_data}")
    
    def test_contact_api(self):
        """Test Contact API - POST /api/contact"""
        print("\n=== Testing Contact API ===")
        
        # Test 1: Valid contact submission
        valid_contact = {
            "name": "María González",
            "email": "maria.gonzalez@example.com",
            "phone": "+1-829-555-0123",
            "subject": "Consulta sobre servicios",
            "message": "Hola, me gustaría obtener más información sobre los horarios de los servicios dominicales."
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=valid_contact, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "name", "email", "subject", "message", "created_at"]):
                    self.log_result("Contact API - Valid submission", True, "Contact message created successfully")
                else:
                    self.log_result("Contact API - Valid submission", False, "Missing required fields in response", data)
            else:
                self.log_result("Contact API - Valid submission", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Contact API - Valid submission", False, f"Request failed: {str(e)}")
        
        # Test 2: Invalid email format
        invalid_email_contact = {
            "name": "Juan Pérez",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=invalid_email_contact, timeout=10)
            if response.status_code == 422:  # Validation error expected
                self.log_result("Contact API - Invalid email", True, "Correctly rejected invalid email format")
            else:
                self.log_result("Contact API - Invalid email", False, f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Contact API - Invalid email", False, f"Request failed: {str(e)}")
        
        # Test 3: Missing required fields
        incomplete_contact = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing subject and message
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/contact", json=incomplete_contact, timeout=10)
            if response.status_code == 422:  # Validation error expected
                self.log_result("Contact API - Missing fields", True, "Correctly rejected incomplete data")
            else:
                self.log_result("Contact API - Missing fields", False, f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Contact API - Missing fields", False, f"Request failed: {str(e)}")
    
    def test_newsletter_api(self):
        """Test Newsletter API - POST /api/newsletter/subscribe"""
        print("\n=== Testing Newsletter API ===")
        
        # Generate unique email for testing
        unique_email = f"test.{uuid.uuid4().hex[:8]}@example.com"
        
        # Test 1: Valid newsletter subscription
        valid_subscription = {
            "email": unique_email,
            "name": "Ana Rodríguez"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=valid_subscription, timeout=10)
            if response.status_code == 200:
                data = response.json()
                if all(key in data for key in ["id", "email", "subscribed_at", "active"]):
                    self.log_result("Newsletter API - Valid subscription", True, "Newsletter subscription created successfully")
                else:
                    self.log_result("Newsletter API - Valid subscription", False, "Missing required fields in response", data)
            else:
                self.log_result("Newsletter API - Valid subscription", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Newsletter API - Valid subscription", False, f"Request failed: {str(e)}")
        
        # Test 2: Duplicate email subscription
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=valid_subscription, timeout=10)
            if response.status_code == 400:  # Duplicate email should be rejected
                self.log_result("Newsletter API - Duplicate email", True, "Correctly rejected duplicate email")
            else:
                self.log_result("Newsletter API - Duplicate email", False, f"Expected 400, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Newsletter API - Duplicate email", False, f"Request failed: {str(e)}")
        
        # Test 3: Invalid email format
        invalid_subscription = {
            "email": "invalid-email-format",
            "name": "Test User"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/newsletter/subscribe", json=invalid_subscription, timeout=10)
            if response.status_code == 422:  # Validation error expected
                self.log_result("Newsletter API - Invalid email", True, "Correctly rejected invalid email format")
            else:
                self.log_result("Newsletter API - Invalid email", False, f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Newsletter API - Invalid email", False, f"Request failed: {str(e)}")
    
    def test_events_api(self):
        """Test Events API - GET /api/events"""
        print("\n=== Testing Events API ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/events", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    if len(data) >= 4:  # Should have 4 initialized events
                        # Check if events have required fields
                        if data and all(key in data[0] for key in ["id", "title", "date", "time", "description", "location"]):
                            self.log_result("Events API - Get events", True, f"Retrieved {len(data)} events successfully")
                        else:
                            self.log_result("Events API - Get events", False, "Events missing required fields", data[0] if data else "No events")
                    else:
                        self.log_result("Events API - Get events", False, f"Expected at least 4 events, got {len(data)}")
                else:
                    self.log_result("Events API - Get events", False, "Response is not a list", data)
            else:
                self.log_result("Events API - Get events", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Events API - Get events", False, f"Request failed: {str(e)}")
    
    def test_church_api(self):
        """Test Church Info API - GET /api/church"""
        print("\n=== Testing Church Info API ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/church", timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["name", "location", "address", "pastor"]
                if all(key in data for key in required_fields):
                    if data["name"] == "Iglesia Bautista Yaguita de Pastor" and "name" in data["pastor"]:
                        self.log_result("Church API - Get info", True, "Church information retrieved successfully")
                    else:
                        self.log_result("Church API - Get info", False, "Incorrect church name or pastor structure", data)
                else:
                    self.log_result("Church API - Get info", False, "Missing required fields", data)
            else:
                self.log_result("Church API - Get info", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Church API - Get info", False, f"Request failed: {str(e)}")
    
    def test_services_api(self):
        """Test Services API - GET /api/services"""
        print("\n=== Testing Services API ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/services", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list) and len(data) >= 4:  # Should have 4 services
                    # Check if services have required fields
                    if all(key in data[0] for key in ["id", "name", "time", "day", "description"]):
                        self.log_result("Services API - Get services", True, f"Retrieved {len(data)} services successfully")
                    else:
                        self.log_result("Services API - Get services", False, "Services missing required fields", data[0])
                else:
                    self.log_result("Services API - Get services", False, f"Expected list with 4+ services, got {type(data)} with {len(data) if isinstance(data, list) else 'N/A'} items")
            else:
                self.log_result("Services API - Get services", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Services API - Get services", False, f"Request failed: {str(e)}")
    
    def test_authentication_api(self):
        """Test Authentication API - Complete JWT authentication flow"""
        print("\n=== Testing Authentication API ===")
        
        # Generate unique test data
        unique_id = uuid.uuid4().hex[:8]
        test_user_data = {
            "email": f"test.{unique_id}@iglesia.com",
            "username": f"testuser{unique_id}",
            "password": "motdepasse123",
            "first_name": "Jean",
            "last_name": "Dupont",
            "phone": "+1829-123-4567"
        }
        
        access_token = None
        
        # Test 1: User Registration - POST /api/auth/register
        try:
            response = requests.post(f"{BACKEND_URL}/auth/register", json=test_user_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["access_token", "token_type", "expires_in", "user"]
                if all(key in data for key in required_fields):
                    access_token = data["access_token"]
                    user_data = data["user"]
                    if (user_data["email"] == test_user_data["email"] and 
                        user_data["username"] == test_user_data["username"] and
                        user_data["first_name"] == test_user_data["first_name"]):
                        self.log_result("Auth API - User registration", True, "User registered successfully with JWT token")
                    else:
                        self.log_result("Auth API - User registration", False, "User data mismatch in response", user_data)
                else:
                    self.log_result("Auth API - User registration", False, "Missing required fields in token response", data)
            else:
                self.log_result("Auth API - User registration", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - User registration", False, f"Request failed: {str(e)}")
        
        # Test 2: Duplicate Email Registration (should fail)
        try:
            response = requests.post(f"{BACKEND_URL}/auth/register", json=test_user_data, timeout=10)
            if response.status_code == 400:
                self.log_result("Auth API - Duplicate email validation", True, "Correctly rejected duplicate email registration")
            else:
                self.log_result("Auth API - Duplicate email validation", False, f"Expected 400, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - Duplicate email validation", False, f"Request failed: {str(e)}")
        
        # Test 3: User Login - POST /api/auth/login
        login_data = {
            "email": test_user_data["email"],
            "password": test_user_data["password"]
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/auth/login", json=login_data, timeout=10)
            if response.status_code == 200:
                data = response.json()
                required_fields = ["access_token", "token_type", "expires_in", "user"]
                if all(key in data for key in required_fields):
                    access_token = data["access_token"]  # Update token from login
                    self.log_result("Auth API - User login", True, "User logged in successfully with JWT token")
                else:
                    self.log_result("Auth API - User login", False, "Missing required fields in login response", data)
            else:
                self.log_result("Auth API - User login", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - User login", False, f"Request failed: {str(e)}")
        
        # Test 4: Invalid Login Credentials
        invalid_login = {
            "email": test_user_data["email"],
            "password": "wrongpassword"
        }
        
        try:
            response = requests.post(f"{BACKEND_URL}/auth/login", json=invalid_login, timeout=10)
            if response.status_code == 401:
                self.log_result("Auth API - Invalid password validation", True, "Correctly rejected invalid password")
            else:
                self.log_result("Auth API - Invalid password validation", False, f"Expected 401, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - Invalid password validation", False, f"Request failed: {str(e)}")
        
        # Test 5: Get User Profile - GET /api/auth/me (requires token)
        if access_token:
            headers = {"Authorization": f"Bearer {access_token}"}
            try:
                response = requests.get(f"{BACKEND_URL}/auth/me", headers=headers, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if (data["email"] == test_user_data["email"] and 
                        data["username"] == test_user_data["username"]):
                        self.log_result("Auth API - Get user profile", True, "User profile retrieved successfully")
                    else:
                        self.log_result("Auth API - Get user profile", False, "Profile data mismatch", data)
                else:
                    self.log_result("Auth API - Get user profile", False, f"HTTP {response.status_code}", response.text)
            except Exception as e:
                self.log_result("Auth API - Get user profile", False, f"Request failed: {str(e)}")
        else:
            self.log_result("Auth API - Get user profile", False, "No access token available for profile test")
        
        # Test 6: Get Profile without Token (should fail)
        try:
            response = requests.get(f"{BACKEND_URL}/auth/me", timeout=10)
            if response.status_code == 403:  # Forbidden without token
                self.log_result("Auth API - Unauthorized profile access", True, "Correctly rejected request without token")
            else:
                self.log_result("Auth API - Unauthorized profile access", False, f"Expected 403, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - Unauthorized profile access", False, f"Request failed: {str(e)}")
        
        # Test 7: Update User Profile - PUT /api/auth/profile (requires token)
        if access_token:
            headers = {"Authorization": f"Bearer {access_token}"}
            profile_update = {
                "first_name": "Jean-Baptiste",
                "last_name": "Dupont-Martinez",
                "bio": "Membre actif de l'église depuis 2024",
                "profession": "Ingénieur logiciel"
            }
            
            try:
                response = requests.put(f"{BACKEND_URL}/auth/profile", json=profile_update, headers=headers, timeout=10)
                if response.status_code == 200:
                    data = response.json()
                    if (data["first_name"] == profile_update["first_name"] and 
                        data["last_name"] == profile_update["last_name"] and
                        data["bio"] == profile_update["bio"]):
                        self.log_result("Auth API - Update user profile", True, "User profile updated successfully")
                    else:
                        self.log_result("Auth API - Update user profile", False, "Profile update data mismatch", data)
                else:
                    self.log_result("Auth API - Update user profile", False, f"HTTP {response.status_code}", response.text)
            except Exception as e:
                self.log_result("Auth API - Update user profile", False, f"Request failed: {str(e)}")
        else:
            self.log_result("Auth API - Update user profile", False, "No access token available for profile update test")
        
        # Test 8: Update Profile without Token (should fail)
        profile_update = {"first_name": "Test"}
        try:
            response = requests.put(f"{BACKEND_URL}/auth/profile", json=profile_update, timeout=10)
            if response.status_code == 403:  # Forbidden without token
                self.log_result("Auth API - Unauthorized profile update", True, "Correctly rejected profile update without token")
            else:
                self.log_result("Auth API - Unauthorized profile update", False, f"Expected 403, got {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Auth API - Unauthorized profile update", False, f"Request failed: {str(e)}")
    
    def test_root_endpoint(self):
        """Test root API endpoint"""
        print("\n=== Testing Root Endpoint ===")
        
        try:
            response = requests.get(f"{BACKEND_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data:
                    self.log_result("Root API - Health check", True, "Root endpoint responding correctly")
                else:
                    self.log_result("Root API - Health check", False, "Missing message field", data)
            else:
                self.log_result("Root API - Health check", False, f"HTTP {response.status_code}", response.text)
        except Exception as e:
            self.log_result("Root API - Health check", False, f"Request failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print(f"🚀 Starting Backend API Tests for: {BACKEND_URL}")
        print("=" * 60)
        
        # Test all endpoints
        self.test_root_endpoint()
        self.test_contact_api()
        self.test_newsletter_api()
        self.test_events_api()
        self.test_church_api()
        self.test_services_api()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.results['total_tests']}")
        print(f"Passed: {self.results['passed']} ✅")
        print(f"Failed: {self.results['failed']} ❌")
        
        if self.results['errors']:
            print("\n🔍 FAILED TESTS:")
            for error in self.results['errors']:
                print(f"  • {error}")
        
        success_rate = (self.results['passed'] / self.results['total_tests']) * 100 if self.results['total_tests'] > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return self.results['failed'] == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)