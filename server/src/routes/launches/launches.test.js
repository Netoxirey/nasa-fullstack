const request = require('supertest');
const app = require('../../app');
const { mongoConnect, mongoDisconnect } = require('../../services/mongo');

describe('Launches api', () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    
    afterAll(async() => {
        await mongoDisconnect();
    });
    
    describe('Test GET /launches', () => {
        test('It should respond with 200 success' ,async () => {
            const response = await request(app)
            .get('/v1/launches')
            .expect('Content-Type', /json/)
            .expect(200);
        });
    });
    
    describe('Test POST / launches' , () => {
        const completeLaunchData = {
            mission: 'USS Enterprise',
            rocket: 'NNC 1707-D',
            target: 'Kepler-62 f',
            launchDate: 'January 4, 2028'
        }
    
        const launchDataWithoutDate = {
            mission: 'USS Enterprise',
            rocket: 'NNC 1707-D',
            target: 'Kepler-62 f',
        }
    
        const launchDataWithInvalidDate = {
            mission: 'USS Enterprise',
            rocket: 'NNC 1707-D',
            target: 'Kepler-62 f',
            launchDate: 'not a date'
        }
        
        test('It should respond with 201 success', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201);
            
            const requestDate = new Date(completeLaunchData.launchDate).valueOf();
            const responseDate = new Date(response.body.launchDate).valueOf();
            expect(responseDate).toBe(requestDate);
    
            expect(response.body).toMatchObject(launchDataWithoutDate);
        });
        test('It should catch missing required properties', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual(
                { 
                    error: 'Missing required data' 
                }
            );
        });
        test('It should catch invalid dates', async () => {
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-Type', /json/)
            .expect(400);
    
            expect(response.body).toStrictEqual(
                { 
                    error: 'Invalid launch date' 
                }
            );
        });
    });
}); 

