export const base44 = {
  entities: {
    DuesSetting: {
      list: async (_order?: string, _limit?: number) => [],
      create: async (data: any) => data,
      update: async (_id: any, data: any) => data,
    },
    Payment: {
      filter: async (_filter?: any, _order?: string, _limit?: number) => [],
      update: async (_id: any, data: any) => data,
    },
    Resident: {
      list: async (_order?: string, _limit?: number) => [],
    },
    Announcement: {
      create: async (data: any) => data,
    },
    Document: {
      create: async (data: any) => data,
    },
  },
  integrations: {
    Core: {
      UploadFile: async () => ({ file_url: "" }),
    },
  },
}
