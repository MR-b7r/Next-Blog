import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import qs from "query-string";
import { Metadata } from "next";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date | string) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    year: "numeric", // numeric year (e.g., '2023')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};

export const isUserNameValid = (username: string) => {
  /* 
    Usernames can only have: 
    - Lowercase Letters (a-z) 
    - Numbers (0-9)
    - Dots (.)
    - Underscores (_)
  */
  const res = /^[a-z0-9_\.]+$/.exec(username);
  const valid = !!res;
  return valid;
};

export const filterschema = () =>
  z.object({
    searchTerm: z.string(),
    sort: z.string(),
    category: z.string(),
  });
export const commentschema = () =>
  z.object({
    comment: z
      .string()
      .min(3, "Comment must be at least 3 characters long.")
      .max(500, "Comment must be at most 500 characters long."),
  });
export const authFormSchema = (type: string) =>
  z.object({
    // sign-up
    username:
      type === "sign-in"
        ? z.string().optional()
        : z
            .string()
            .min(3, "Username must be at least 3 characters long.")
            .max(20, "Username must be at most 20 characters long.")
            .regex(
              /^(?! )[a-zA-Z0-9._ ]*(?<! )$/,
              "Username can only has lowercase letters (a-z), numbers (0-9), dots (.), and underscores (_)."
            ),
    // both
    email: z.string().email(),
    password: z
      .string()
      .refine((value) => value.length >= 8 && value.length <= 20, {
        message: "Password must be between 8 and 20 characters long.",
      }),
    // password: z.string().min(8).max(20),
  });

export const updateProfile = () =>
  z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long.")
      .max(20, "Username must be at most 20 characters long.")
      .regex(
        /^(?! )[a-zA-Z0-9._ ]*(?<! )$/,
        "Username can only has lowercase letters (a-z), numbers (0-9), dots (.), and underscores (_)."
      ),
    email: z.string().email().optional(),
    password: z
      .string()
      .optional()
      .refine((value) => !value || (value.length >= 8 && value.length <= 20), {
        message:
          "Password must be between 8 and 20 characters long or left empty.",
      }),
    profilePicture: z.string().optional(),
  });

export const postForm = () =>
  z.object({
    content: z.string().min(10, "Content must be at least 10 characters long."),
    title: z.string().min(3, "Title must be at least 3 characters long."),
    category: z.string().optional(),
    image: z.string().optional(),
  });

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
export function constructMetadata({
  title = "NextBlog",
  description = "Read insightful articles about web development, design, and technology — all in one place.",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    icons,
    metadataBase: new URL("https://nextdev-blog.vercel.app/"),
  };
}
