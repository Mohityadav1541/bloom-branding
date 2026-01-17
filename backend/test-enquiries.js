const axios = require('axios');

const API_URL = 'http://localhost:5000/api/enquiries';

async function testEnquiries() {
    try {
        console.log('1. Testing POST enquiry...');
        const newEnquiry = {
            name: 'Test Users',
            email: 'test@example.com',
            serviceInterest: 'Testing',
            message: 'This is a test enquiry from the verification script.'
        };
        const createRes = await axios.post(API_URL, newEnquiry);
        console.log('✅ Created:', createRes.data._id);
        const id = createRes.data._id;

        console.log('2. Testing GET enquiries...');
        const listRes = await axios.get(API_URL);
        const found = listRes.data.find(e => e._id === id);
        if (found) {
            console.log('✅ Enquiry found in list');
        } else {
            console.error('❌ Enquiry NOT found in list');
        }

        console.log('3. Testing DELETE enquiry...');
        await axios.delete(`${API_URL}/${id}`);
        console.log('✅ Deleted');

        console.log('4. Verifying deletion...');
        const verifyRes = await axios.get(API_URL);
        const stillExists = verifyRes.data.find(e => e._id === id);
        if (!stillExists) {
            console.log('✅ Enquiry successfully removed');
        } else {
            console.error('❌ Enquiry still exists');
        }

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testEnquiries();
