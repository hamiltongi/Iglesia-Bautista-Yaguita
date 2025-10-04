#!/usr/bin/env python3
"""
Quick test of donation system with new Stripe key
"""

import requests
import json

BACKEND_URL = 'https://mobile-version-4.preview.emergentagent.com/api'

print('=== TESTING DONATION SYSTEM WITH NEW STRIPE KEY ===')

# Test 1: GET /api/donations/packages
print('\n1. Testing GET /api/donations/packages')
try:
    response = requests.get(f'{BACKEND_URL}/donations/packages', timeout=10)
    if response.status_code == 200:
        packages = response.json()
        print(f'✅ SUCCESS: Retrieved {len(packages)} packages')
        for pkg in packages:
            print(f'   - {pkg["id"]}: ${pkg["amount"]} - {pkg["name"]}')
    else:
        print(f'❌ FAILED: HTTP {response.status_code}')
except Exception as e:
    print(f'❌ ERROR: {e}')

# Test 2: POST /api/donations/checkout with support package ($50)
print('\n2. Testing POST /api/donations/checkout with support package ($50)')
support_data = {
    'package_id': 'support',
    'donation_type': 'one_time',
    'message': 'Test donation for support',
    'anonymous': False,
    'donor_name': 'Jean Testeur',
    'donor_email': 'jean.testeur@example.com',
    'origin_url': 'https://mobile-version-4.preview.emergentagent.com'
}

try:
    response = requests.post(f'{BACKEND_URL}/donations/checkout', json=support_data, timeout=15)
    if response.status_code == 200:
        data = response.json()
        print(f'✅ SUCCESS: Checkout session created')
        print(f'   - Session ID: {data["session_id"]}')
        print(f'   - Stripe URL: {data["url"][:50]}...')
        session_id = data['session_id']
    else:
        print(f'❌ FAILED: HTTP {response.status_code} - {response.text}')
        session_id = None
except Exception as e:
    print(f'❌ ERROR: {e}')
    session_id = None

# Test 3: POST /api/donations/checkout with custom amount ($75)
print('\n3. Testing POST /api/donations/checkout with custom amount ($75)')
custom_data = {
    'package_id': 'custom',
    'amount': 75.0,
    'donation_type': 'one_time',
    'message': 'Test custom donation',
    'anonymous': False,
    'donor_name': 'Marie Testeuse',
    'donor_email': 'marie.testeuse@example.com',
    'origin_url': 'https://mobile-version-4.preview.emergentagent.com'
}

try:
    response = requests.post(f'{BACKEND_URL}/donations/checkout', json=custom_data, timeout=15)
    if response.status_code == 200:
        data = response.json()
        print(f'✅ SUCCESS: Custom checkout session created')
        print(f'   - Session ID: {data["session_id"]}')
        print(f'   - Stripe URL: {data["url"][:50]}...')
    else:
        print(f'❌ FAILED: HTTP {response.status_code} - {response.text}')
except Exception as e:
    print(f'❌ ERROR: {e}')

# Test 4: Check payment status if we have a session
if session_id:
    print(f'\n4. Testing GET /api/donations/status/{session_id}')
    try:
        response = requests.get(f'{BACKEND_URL}/donations/status/{session_id}', timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f'✅ SUCCESS: Payment status retrieved')
            print(f'   - Status: {data["payment_status"]}')
            print(f'   - Amount: ${data["amount"]} {data["currency"].upper()}')
        else:
            print(f'❌ FAILED: HTTP {response.status_code} - {response.text}')
    except Exception as e:
        print(f'❌ ERROR: {e}')

print('\n=== DONATION SYSTEM TEST COMPLETE ===')