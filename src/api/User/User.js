import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    posts: ({ id }) => prisma.user({ id }).posts(),
    isSelf: (parent, _, { request }) => {
      const { user } = request;
      const { id: parentId } = parent; // parent에서 id를 가져오는데 그걸 parentId라고 한다.
      return user.id === parentId; // 가져온 parentId랑 request의 id랑 같은지 boolean
    }
  }
};
