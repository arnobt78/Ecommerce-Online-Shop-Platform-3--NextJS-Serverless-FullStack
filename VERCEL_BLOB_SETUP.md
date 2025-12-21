# How to Set Up Vercel Blob Storage

## Step-by-Step Guide

### Step 1: Navigate to Storage Tab

1. In your Vercel dashboard, look at the **top navigation bar**
2. Click on the **"Storage"** tab (not Settings → Storage)
3. You should see options to create databases

### Step 2: Create Blob Storage

1. On the Storage page, you'll see different storage options
2. Look for **"Blob"** - it should show "Fast object storage"
3. Click the **"Create"** button next to Blob
4. Give it a name (e.g., `product-images` or `store-images`)
5. Select your region (choose the closest to your users)
6. Click **"Create"** to create the Blob store

### Step 3: Get the Read/Write Token

After creating the Blob store:

1. You'll be taken to the Blob store details page
2. Look for **"Tokens"** or **"API Tokens"** section
3. Or go to: **Settings** → Look for your Blob store → **Tokens**
4. Click **"Create Token"** or **"Generate Token"**
5. Select **"Read/Write"** permissions
6. Copy the token (it will look like: `vercel_blob_xxxxx_xxxxx_xxxxx`)

### Step 4: Add Token to Environment Variables

1. Go to your project: **store-next-beta**
2. Navigate to: **Settings** → **Environment Variables**
3. Add a new variable:
   - **Key**: `BLOB_READ_WRITE_TOKEN`
   - **Value**: (paste the token you copied)
   - **Environment**: Select all (Production, Preview, Development)
4. Click **"Save"**

### Step 5: Update Local .env File

Add the same token to your local `.env` file:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxx_xxxxx_xxxxx
```

---

## Alternative: If You Don't See Blob Option

If you don't see the Blob option in the Storage tab:

1. Make sure you're on the **correct project** (store-next-beta)
2. Check if your Vercel plan supports Blob storage (it should be available on most plans)
3. Try refreshing the page
4. If still not visible, you might need to:
   - Go to your **Team/Account settings**
   - Check if Blob storage is enabled for your account

---

## Quick Visual Guide

```bash
Vercel Dashboard
├── Top Navigation Bar
│   └── Click "Storage" ← YOU ARE HERE
│       └── Click "Create" next to "Blob"
│           └── Name it → Create
│               └── Get Token from Blob store settings
│                   └── Add to Environment Variables
```

---

## After Setup

Once you have the token:

1. ✅ Add it to Vercel Environment Variables
2. ✅ Add it to your local `.env` file
3. ✅ Run `npm install` to install `@vercel/blob`
4. ✅ Test image upload in your admin panel

---

**Note**: The Blob storage is free for reasonable usage, but check Vercel's pricing for your specific needs.
