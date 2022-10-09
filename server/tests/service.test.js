import { dereferenceArray } from "../services/service"

describe("Successfully runs all until functions properly", () =>{
    test("Successfully deferences arrays", () => {
        const sampleOne = ["Google", "Classroom"]
        expect(dereferenceArray(sampleOne)).toStrictEqual("Google, Classroom")
    })
})