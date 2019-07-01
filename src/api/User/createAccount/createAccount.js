import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { userName, email, position, belongTo, Rank = "" } = args;
      const exists = await prisma.$exists.user({
        OR: [
          {
            userName
          },
          {
            email
          }
        ]
      });

      if (exists) {
        throw Error("입력하신 이름 또는 이메일은 이미 존재합니다");
      }
      await prisma.createUser({
        userName,
        email,
        position,
        belongTo,
        Rank
      });
      return true;
    }
  }
};
