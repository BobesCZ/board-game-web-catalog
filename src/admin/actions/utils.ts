'use server';

import { neon } from '@neondatabase/serverless';
import { revalidatePath, updateTag } from 'next/cache';
import { Urls } from '@/config';
import { DB_SCHEMA } from '../config';
import { GAMELIST_RECORDS_TABLE, USER_AUTH_RECORDS_TABLE, WEB_EVENTS_RECORDS_TABLE } from './config';
import { CacheTags } from './types';

const sql = neon(process.env.DATABASE_URL ?? '');

export const revalidateAllAdminPaths = async () => {
  revalidatePath(Urls.ADMIN);
  revalidatePath(Urls.ADMIN_NEW);
  revalidatePath(Urls.ADMIN_USERS);
  revalidatePath(Urls.ADMIN_SETTINGS);
};

export const revalidateAllTags = async () => {
  updateTag(CacheTags.GAMELIST_RECORDS);
  updateTag(CacheTags.ACTIVE_GAMELIST);
};

export const createTables = async () => {
  await sql.query(`CREATE SCHEMA IF NOT EXISTS "${DB_SCHEMA}";`);

  await sql.query(`
      CREATE TABLE IF NOT EXISTS ${USER_AUTH_RECORDS_TABLE} (
        "recordId" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        "status" TEXT NOT NULL,
        "name" TEXT NOT NULL,
        "email" TEXT,
        "password" TEXT
      );
    `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS ${GAMELIST_RECORDS_TABLE} (
      "recordId" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "recordName" TEXT NOT NULL,
      "status" TEXT NOT NULL,
      "gameList" JSONB,
      "isActive" BOOLEAN DEFAULT false,
      "userRecordId" INTEGER,
        CONSTRAINT fk_user_auth_record
          FOREIGN KEY ("userRecordId")
          REFERENCES ${USER_AUTH_RECORDS_TABLE}("recordId")
          ON DELETE SET NULL
    );
  `);

  await sql.query(`
    CREATE TABLE IF NOT EXISTS ${WEB_EVENTS_RECORDS_TABLE} (
      "recordId" INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      "created" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
      "type" TEXT NOT NULL,
      "place" TEXT NOT NULL,
      "data" JSONB
    );
  `);
};
