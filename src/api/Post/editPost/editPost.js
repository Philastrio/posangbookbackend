import { prisma } from "../../../../generated/prisma-client";

const DELETE = "DELETE";
const EDIT = "EDIT";

export default {
  Mutation: {
    editPost: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);

      const {
        id,
        action,
        winnerName,
        birth,
        address,
        docNum,
        prizeCategory,
        prizeRank,
        prizeDate,
        contribution,
        belongTo,
        eventName
      } = args;
      const { user } = request;
      const post = await prisma.$exists.post({ id, user: { id: user.id } });
      try {
        if (action === EDIT) {
          return prisma.updatePost({
            data: {
              winnerName,
              birth,
              address,
              docNum,
              prizeCategory,
              prizeRank,
              prizeDate,
              contribution,
              belongTo,
              eventName
            },
            where: { id }
          });
        } else if (action === DELETE) {
          return prisma.deletePost({ id });
        }
      } catch (e) {
        console.log(e);
      }
    }
  }
};
