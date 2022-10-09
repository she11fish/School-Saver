import { generateId } from "../utils/util"

describe("Successfully runs all util functions properly", () =>{
    test("Successfully generates id", async () => {
        const id = await generateId()
        expect(id).toStrictEqual(18);
    })
})