export const parseUserId = (id: string) => {
  const userId = Number(id);
  if (isNaN(userId)) throw { status: 400, message: "Invalid user id" };
  return userId;
};
