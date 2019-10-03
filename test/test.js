const expect = require("chai").expect;
const request = require("request");

//tests if the response status code is 200 (successful)
describe("home page", () => {
  it("should have a status code of 200", done => {
    request("http://localhost:3000", (err, res, body) => {
      expect(res.statusCode).to.equal(200);
      done();
    });
  });
});

//tests if response returns an object
describe("Products", () => {
  it("should return an object", done => {
    request("http://localhost:3000/api/products", (err, res, body) => {
      expect(res).to.be.an("object");
      done();
    });
  });
});

describe("Product filter", () => {
  it("should return an object", done => {
    request(
      "http://localhost:3000/api/products/filter/electric/squier/0/200",
      (err, res, json) => {
        expect(res).to.be.an("object");
        done();
      }
    );
  });
});

describe("Contacts", () => {
  it("should return an object", done => {
    request("http://localhost:3000/api/contacts", (err, res, json) => {
      expect(res).to.be.an("object");
      done();
    });
  });
});
