"use server";

import prisma from "./prisma";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (e) {
    console.log(e);
  }
};

export const getUserOrgSeasonsal = async () => {
  try {
    const data = await prisma.user.findUnique({
      where: {
        id: 1,
      },
      include: {
        organizations: {
          include: {
            seasonals: {
              include: {
                prep: true,
              },
            },
          },
        },
      },
    });

    return data;
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
