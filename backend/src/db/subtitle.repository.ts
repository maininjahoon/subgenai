import { prisma } from "./client.js";

const createSubtitle = async (
  userId: number,
  title: string,
  format: string,
) => {
  return prisma.subtitle.create({
    data: {
      userId,
      title,
      format,
      status: "PROCESSING",
    },
  });
};

const findSubtitlesByUserId = async (
  userId: number,
  page: number,
  format?: string,
  searchTerm?: string,
) => {
  const trimmedSearch = searchTerm?.trim();
  const itemsToSKip = (page - 1) * 5;
  const itemsToTake = 5;
  return await prisma.subtitle.findMany({
    where: {
      userId,
      status: "COMPLETED",
      ...(format && { format: { equals: format } }),
      ...(trimmedSearch && {
        title: { contains: trimmedSearch, mode: "insensitive" },
      }),
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      url: true,
      format: true,
    },
    skip: itemsToSKip,
    take: itemsToTake,
  });
};

const findRecentSubtitlesByUserId = async (userId: number) => {
  return await prisma.subtitle.findMany({
    where: {
      userId,
      status: "COMPLETED",
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      createdAt: true,
      url: true,
      format: true,
    },
    take: 3,
  });
};

const findTotalSubtitleByUserId = async (
  userId: number,
  format?: string,
  searchTerm?: string,
) => {
  const trimmedSearch = searchTerm?.trim();
  return await prisma.subtitle.count({
    where: {
      userId,
      status: "COMPLETED",
      ...(format && { format: { equals: format } }),
      ...(trimmedSearch && {
        title: { contains: trimmedSearch, mode: "insensitive" },
      }),
    },
  });
};

const getStats = async (userId: number) => {
  const [totalSubtitles, completedSubtitles, processingSubtitles] =
    await Promise.all([
      prisma.subtitle.count({
        where: { userId },
      }),

      prisma.subtitle.count({
        where: {
          userId,
          status: "COMPLETED",
        },
      }),

      prisma.subtitle.count({
        where: {
          userId,
          status: "PROCESSING",
        },
      }),
    ]);
  return {
    totalSubtitles,
    completedSubtitles,
    processingSubtitles,
  };
};

const updateSubtitleStatus = async (
  id: number,
  data: { status: "COMPLETED" | "FAILED"; url?: string },
) => {
  return prisma.subtitle.update({
    where: { id },
    data,
  });
};

const deleteSubtitleById = async (id: number, userId: number) => {
  return prisma.subtitle.deleteMany({
    where: {
      id,
      userId,
    },
  });
};

export {
  createSubtitle,
  findSubtitlesByUserId,
  findRecentSubtitlesByUserId,
  findTotalSubtitleByUserId,
  getStats,
  updateSubtitleStatus,
  deleteSubtitleById,
};
