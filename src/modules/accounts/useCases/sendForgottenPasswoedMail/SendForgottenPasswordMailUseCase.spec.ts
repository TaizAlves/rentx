import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgottenPasswordMailUseCase } from "./SendForgottenPasswordMailUseCase";

let sendForgottenMailUseCase: SendForgottenPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProviderInMemory: MailProviderInMemory;

describe("Send forgotten Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayJsDateProvider();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProviderInMemory = new MailProviderInMemory();

    sendForgottenMailUseCase = new SendForgottenPasswordMailUseCase(
      usersRepositoryInMemory,
      userTokensRepositoryInMemory,
      dateProvider,
      mailProviderInMemory
    );
  });

  it("should be able to send a forgotten password mail to user", async () => {
    const sendMail = jest.spyOn(mailProviderInMemory, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "129512",
      email: "navfauc@pi.sk",
      name: "Ida Hall",
      password: "1234",
    });

    await sendForgottenMailUseCase.execute("navfauc@pi.sk");

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if users does no exists", async () => {
    await expect(
      sendForgottenMailUseCase.execute("gef@meha.ph")
    ).rejects.toEqual(new AppError("User does not exists"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(
      userTokensRepositoryInMemory,
      "create"
    );

    usersRepositoryInMemory.create({
      email: "jurunnew@ce.ax",
      name: "Eliza Walsh",
      driver_license: "332575",
      password: "1234",
    });

    await sendForgottenMailUseCase.execute("jurunnew@ce.ax");

    expect(generateTokenMail).toBeCalled();
  });
});
