import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    logUserIn: async (_, args) => {
      const { token } = args;
      const user = await prisma.user({ token });
      return await prisma.user({ token: token });
    }
  }
};
