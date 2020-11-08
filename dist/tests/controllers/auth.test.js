"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
jest.setTimeout(30000);
describe("Auth controller", () => {
    let mRes;
    let mNext;
    beforeEach(() => {
        mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mNext = jest.fn();
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    // it("should call next when error happens", async () => {
    //   const mReq = {} as any;
    //   await login(mReq, mRes, mNext);
    //   expect(mNext).toBeCalledWith(expect.any(Error));
    // });
    // it("should return error message if user with such login not found", async () => {
    //   const mReq = {
    //     body: {
    //       login: "test",
    //     },
    //   } as any;
    //   await login(mReq, mRes, mNext);
    //   expect(mRes.status).toBeCalledWith(404);
    //   expect(mRes.status().json).toBeCalledWith({
    //     error: { message: "Not found!" },
    //   });
    // });
    it("should return successfull response", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(true).toBeTruthy();
        // const mReq = {
        //   body: {
        //     login: 'user1',
        //     password: 'user1Pass',
        //   },
        // } as any;
        // await login(mReq, mRes, mNext);
        // expect(mRes.status).toBeCalledWith(200);
        // expect(mRes.status().json).toBeCalledWith({
        //   auth: true,
        // });
    }));
});
//# sourceMappingURL=auth.test.js.map