const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const assert = chai.assert;

const app = require('../../lib/app');
const request = chai.request(app);


// Testing Data & Function
let nabeTest1 = { name: 'nabeTest1', quadrant: 'NW' };
let nabeTest2 = { name: 'nabeTest2', quadrant: 'SW'};
let nabeTest3 = { name: 'nabeTest3', quadrant: 'N'};

function saveNabe(nabe) {
    return request.post('/api/neighborhoods')
        .send(nabe)
        .then(res => res.body);
}  
// End Testing Data & Function


describe('Neighborhood API Route Tests', () => {

    it('GET /neighborhoods - Returns empty array', () => {
        return request.get('/api/neighborhoods')
            .then(res => res.body)
            .then(neighborhoods => assert.deepEqual(neighborhoods, []));
    });

    it('POST /neighborhoods - Adds neighborhood per Neighborhood Schema', () => {
        return request.post('/api/neighborhoods')
            .send(nabeTest1)
            .then(res => res.body)
            .then(savedNabe => {
                assert.ok(savedNabe._id);
                nabeTest1._id = savedNabe._id;
                assert.equal(savedNabe.name, nabeTest1.name);
                assert.equal(savedNabe.quadrant, nabeTest1.quadrant);
            });
    });

    it('GET /neighborhoods - Returns nabeTest1', () => {
        return request.get('/api/neighborhoods')
            .then(res => res.body)
            .then(neighborhoods => {
                assert.equal(neighborhoods[0]._id, nabeTest1._id);
                assert.equal(neighborhoods[0].name, nabeTest1.name);
                assert.equal(neighborhoods[0].quadrant, nabeTest1.quadrant);
                // assert.deepEqual(neighborhoods, [nabeTest1]));
            });
    });

    it('GET /neighborhoods - Returns array of 3 neighborhoods: nabeTest1-3', () => {
        saveNabe(nabeTest2);
        saveNabe(nabeTest3);
        return request.get('/api/neighborhoods')
            .then(res => res.body)
            .then(neighborhoods => assert.equal(neighborhoods.length, 3));
    });

    it('GET /neighborhoods/:id - Returns neighborhood by ID', () => {
        return request.get(`/api/neighborhoods/${nabeTest1._id}`)
            .then(res => res.body)
            .then(neighborhood => assert.equal(neighborhood.name, nabeTest1.name));
    });

});
