import supertest from "supertest";
import { AddressTest, ContactTest, UserTest } from "./test-util";
import { web } from "../src/application/web"
import { logger } from "../src/application/logging";

describe('POST /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll()
        await UserTest.delete();
    })

    it('should be able to create address', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "Indonesia",
                postal_code: "97762",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jl. Jendral Sudirman");
        expect(response.body.data.city).toBe("Yogyakarta");
        expect(response.body.data.province).toBe("D.I. Yogyakarta");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("97762");
    });

    it('should reject create new address if request is invalid', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "",
                city: "",
                province: "",
                country: "",
                postal_code: "",
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject create new address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const response = await supertest(web)
            .post(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "Indonesia",
                postal_code: "97762",
            });

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
        expect(response.body.errors).toBe("Contact is not found");
    });
});

describe('GET /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll()
        await UserTest.delete();
    })

    it('should be able to get contact address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBeDefined();
        expect(response.body.data.street).toBe("Jalan test");
        expect(response.body.data.city).toBe("Kota test");
        expect(response.body.data.province).toBe("Provinsi test");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("11111");
    });

    it('should reject get address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject get address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
})


describe('PUT /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll()
        await UserTest.delete();
    })

    it('should be able to update address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "Indonesia",
                postal_code: "97762",
            })

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(address.id);
        expect(response.body.data.street).toBe("Jl. Jendral Sudirman");
        expect(response.body.data.city).toBe("Yogyakarta");
        expect(response.body.data.province).toBe("D.I. Yogyakarta");
        expect(response.body.data.country).toBe("Indonesia");
        expect(response.body.data.postal_code).toBe("97762");
    });

    it('should reject update address if request is invalid', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "",
                postal_code: "",
            })

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "Indonesia",
                postal_code: "97762",
            })

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject update address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .put(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test")
            .send({
                street: "Jl. Jendral Sudirman",
                city: "Yogyakarta",
                province: "D.I. Yogyakarta",
                country: "Indonesia",
                postal_code: "97762",
            })

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
})

describe('DELETE /api/contacts/:contactId/addresses/:addressId', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll()
        await UserTest.delete();
    })

    it('should be able to remove address', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data).toBe("OK");
    });

    it('should reject remove address if address is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id}/addresses/${address.id + 1}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should reject remove address if contact is not found', async () => {
        const contact = await ContactTest.get();
        const address = await AddressTest.get();

        const response = await supertest(web)
            .delete(`/api/contacts/${contact.id + 1}/addresses/${address.id}`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/contacts/:contactId/addresses', () => {
    beforeEach(async () => {
        await UserTest.create()
        await ContactTest.create()
        await AddressTest.create();
    })

    afterEach(async () => {
        await AddressTest.deleteAll();
        await ContactTest.deleteAll()
        await UserTest.delete();
    })

    it('should be able to list addresses', async () => {
        const contact = await ContactTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id}/addresses`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(1);
    });

    it('should reject list address if contact is not found', async () => {
        const contact = await ContactTest.get();

        const response = await supertest(web)
            .get(`/api/contacts/${contact.id + 1}/addresses`)
            .set("X-API-TOKEN", "test");

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });
});