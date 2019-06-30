import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchByNameBirth: async (_, args, args2) =>
      prisma.posts({
        where: {
          AND: [
            { winnerName_contains: args.winnerName },
            { birth_contains: args2.birth }
          ]
        }
      })
  }
};
