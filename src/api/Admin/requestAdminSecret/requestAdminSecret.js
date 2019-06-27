import { generateSecret, sendSecretMail } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    requestAdminSecret: async (_, args) => {
      const { email } = args;
      const loginAdminSecret = generateSecret();
      try {
        await sendSecretMail(email, loginAdminSecret);
        await prisma.updateAdmin({
          data: { loginAdminSecret },
          where: { email }
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    }
  }
};
