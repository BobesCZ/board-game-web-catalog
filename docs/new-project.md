# Zprovoznění aplikace

Návod pro _programátory_.

## GitHub

1. Udělejte `fork` / `import` tohoto repozitáře
2. Proveďte `clone` vašeho nově vytvořeného repozitáře na lokální disk
3. V naklonovaném repoziráře spusťte `git remote add origin-base https://github.com/BobesCZ/board-game-web-catalog.git`

## Vercel

1. Vytvořte nový projekt přes **Dashboard > Add New Project**
2. Importujte váš repozitář
3. V sekci **Configure Project > Build and Output Settings** nastavte **Install Command** na `npm install --force`
4. Klikněte na **Deploy** pro založení projektu (build skončí chybou)
5. V **Settings > Environments > Production** nastavte branch na `production` místo `master`

## Neon

1. Přejděte na **Storage > Create Database > Marketplace Database Providers > Neon** a vytvořte Postgres databázi
2. V sekci Quickstart klikněte na Show Secrets a zkopírujte proměnnou `DATABASE_URL` do **env.local** > `DATABASE_URL`
3. Klikněte na **Connect Project** a připojte Vercel projekt
4. Ve Vercelu proveďte **Redeploy** (build by měl proběhnout v pořádku)
5. Klikněte na **Open in Neon > Tables > Create schema** a vytvořte schéma (ve formátu snake_case)
6. Změňte proměnnou v **src\admin\config\config.ts** > `DB_SCHEMA`

## Next-auth - Google

1. Založte **Credentials > OAuth client ID > Web Application** [v Google Console](https://console.developers.google.com/apis/credentials)

2. Do sekce **Authorized redirect URIs** přidejte 2 URI [viz návod](https://next-auth.js.org/providers/google#configuration)

3. Zkopírujte údaje ze sekce **Client secrets** do **env.local** > `GOOGLE_CLIENT_ID` a `GOOGLE_CLIENT_SECRET`

4. Vygenerujte `secret` [zde](https://generate-secret.vercel.app/32) a uložte do **env.local** > `NEXTAUTH_SECRET`

5. Vložte `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` a `NEXTAUTH_SECRET` do Vercelu přes **Settings > Environment Variables** [viz návod](https://vercel.com/guides/how-to-add-vercel-environment-variables)

6. Přidejte do `env.local` tento řádek `NEXTAUTH_URL="http://localhost:3000"` (toto je pouze pro local, v produkci se URL adresa zjistí automaticky z Vercelových `System Environment Variables`)

> **POZNÁMKA:** Next-auth nefunguje v Preview Environment (Google při pokusů o přihlášení vyhodí chybu).

> **POZNÁMKA:** Na lokálním prostředí je Administrace z praktických důvodů přístupná i bez přihlášení (tzn. není rozdíl mezi přihlášeným a nepřihlášeným uživatelem), toto chování upravuje config proměnná `DISABLE_USER_AUTH_ON_DEVELOPMENT`.

## BGG TOKEN

1. Registrujte se na boardgamegeek.com pro získání tokenu (bez něj nelze API používat) [viz návod](https://boardgamegeek.com/using_the_xml_api)
2. Uložte do **env.local** > `BGG_API_TOKEN` a do Vercelu přes **Settings > Environment Variables** [viz návod](https://vercel.com/guides/how-to-add-vercel-environment-variables)

## Kontrola nastavení

1. Ve Vercelu proveďte **Redeploy**
2. Zkontrolujte homepage produkčního webu i administraci
3. V terminálu spusťte `npm run dev` a zkontrolujte lokální verzi
4. Otevřete `http://localhost:3000/admin`, vytvoří se prázdné tabulky v DB

## Klientská grafika

Nezapomeňte změnit tyto věci dle přání klienta:

### Název stránky

- **src\app\[locale]\layout.tsx** > proměnná `metadata.title`
- **src\messages\cs.json** + **src\messages\cs.json** > proměnná `meta.title`

### Logo + Favicon

Soubory vložte do složky **/public**

- **src\app\[locale]\layout.tsx** > proměnná `metadata.icons`
- **src\components\app-nav\AppNav.tsx** > Image > `src`

### Font a barvy

- **src\theme\fonts.ts**
- **src\theme\config.ts**

---

Nyní pokračujte návodem [Správa uživatelů](/users.md)

---

[≪ zpět na hlavní stranu](/index.md)
