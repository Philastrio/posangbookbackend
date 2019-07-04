import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const authId = await prisma.$exists.user({ id: user.id }); // user로 들어가서 user의 id가 존재하는지 boolean이다
      if (authId) {
        return prisma.posts({
          where: {
            OR: [
              { prizeNum_contains: args.term },
              { winnerName_contains: args.term },
              { birth_contains: args.term },
              { address_contains: args.term },
              { prizeCategory_contains: args.term },
              { prizeRank_contains: args.term },
              { prizeDate_contains: args.term },
              { contribution_contains: args.term },
              { belongTo_contains: args.term },
              { eventName_contains: args.term }
            ]
          }
        });
      } else {
        throw Error("검색도 로그인이 필요합니다");
      }
    }
  }
};
