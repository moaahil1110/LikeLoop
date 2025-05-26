# 🧪 LikeLoop Testing Guide

## Testing the Email/Username Login Feature

### Prerequisites
1. Backend server running on http://localhost:5002
2. Frontend server running on http://localhost:3000
3. MongoDB Atlas connected
4. At least 1 registered user account for testing

### Step-by-Step Testing Instructions

#### 1. Test Login with Email
1. **Go to Login Page**: Navigate to http://localhost:3000/login
2. **Enter Email**: In the "Email or Username" field, enter: `testuser1@example.com`
3. **Enter Password**: Enter the password: `password123`
4. **Click Sign In**: Should successfully log in and redirect to feed

#### 2. Test Login with Username
1. **Logout**: Click logout to return to login page
2. **Enter Username**: In the "Email or Username" field, enter: `TestUser1`
3. **Enter Password**: Enter the password: `password123`
4. **Click Sign In**: Should successfully log in and redirect to feed

#### 3. Test Invalid Credentials
1. **Wrong Email**: Try `wrongemail@example.com` with any password
2. **Wrong Username**: Try `WrongUser` with any password
3. **Wrong Password**: Try correct email/username with wrong password
4. **Verify Error**: Should show "Invalid email/username or password"

---

## Testing the Follow/Unfollow Feature

### Prerequisites
1. Backend server running on http://localhost:5002
2. Frontend server running on http://localhost:3000
3. MongoDB Atlas connected
4. At least 2 user accounts for testing

### Step-by-Step Testing Instructions

#### 1. Create Test Users
1. **Register User 1**:
   - Go to http://localhost:3000/register
   - Create account: `testuser1@example.com` / `TestUser1` / `password123`

2. **Register User 2**:
   - Logout from User 1
   - Create account: `testuser2@example.com` / `TestUser2` / `password123`

#### 2. Test Follow Functionality

**As User 2 (following User 1):**
1. Login as `testuser2@example.com`
2. Search for "TestUser1" in the search bar (if implemented) OR
3. Navigate directly to User 1's profile at: http://localhost:3000/profile/[user1_id]
4. **Verify Follow Button Appears**: You should see a "Follow" button
5. **Click Follow**: Button should change to "Following"
6. **Check Follower Count**: User 1's follower count should increase by 1

**As User 1 (checking followers):**
1. Login as `testuser1@example.com`
2. Go to your profile
3. **Verify Follower Count**: Should show 1 follower
4. **No Follow Button**: Should only see "Edit Profile" button (own profile)

#### 3. Test Unfollow Functionality

**As User 2:**
1. Visit User 1's profile again
2. **Verify Following Button**: Should show "Following"
3. **Click Following**: Button should change to "Follow"
4. **Check Follower Count**: User 1's follower count should decrease by 1

#### 4. Test Feed Integration

**Create Posts (as User 1):**
1. Login as User 1
2. Create a new post with an image
3. Add caption: "Hello from TestUser1!"

**Follow and Check Feed (as User 2):**
1. Login as User 2
2. Follow User 1 again
3. Go to Feed page
4. **Verify**: User 1's post should appear in User 2's feed

### Expected UI Elements

#### Profile Page (Other User)
```
[Avatar] TestUser1
         2 posts  1 followers  3 following
         User bio text here...
         [Follow] / [Following] Button
```

#### Profile Page (Own Profile)
```
[Avatar] TestUser2
         5 posts  0 followers  1 following
         Your bio text here...
         [Edit Profile] Button
```

### API Endpoints Being Tested

- `POST /api/users/follow/:id` - Follow/unfollow toggle
- `GET /api/users/profile/:id` - Get user profile with follower counts
- `GET /api/posts/feed` - Get feed posts from followed users

### Common Issues & Solutions

1. **Follow Button Not Appearing**:
   - Check if you're viewing another user's profile (not your own)
   - Ensure you're logged in
   - Check browser console for JavaScript errors

2. **Follow Button Not Working**:
   - Check network tab for API call failures
   - Verify backend server is running on port 5002
   - Check MongoDB connection

3. **Follower Count Not Updating**:
   - Refresh the page to see updated counts
   - Check if the profile state is being updated correctly

4. **Posts Not Appearing in Feed**:
   - Ensure you're following the user who created the post
   - Check if posts are being fetched with correct user relationships

### Success Criteria ✅

- [ ] Follow button appears on other users' profiles
- [ ] Follow button changes to "Following" after clicking
- [ ] Follower count updates in real-time
- [ ] Unfollow functionality works (Following → Follow)
- [ ] Own profile shows "Edit Profile" instead of follow button
- [ ] Feed shows posts from followed users
- [ ] Following/follower counts are accurate

### Debugging Tools

**Browser Developer Tools:**
1. **Console**: Check for JavaScript errors
2. **Network**: Monitor API calls to `/api/users/follow/:id`
3. **Application**: Check localStorage for auth token

**Backend Logs:**
- Monitor server console for API request logs
- Check MongoDB connection status

### Test Data Cleanup

After testing, you can:
1. Delete test posts through the UI
2. Unfollow all test relationships
3. Or reset the database if needed

---

## 🎯 Quick Test Checklist

**5-Minute Follow Feature Test:**
1. ✅ Create 2 test accounts
2. ✅ Login as User 2, visit User 1's profile
3. ✅ Click "Follow" button
4. ✅ Verify button changes to "Following"
5. ✅ Check follower count increased
6. ✅ Click "Following" to unfollow
7. ✅ Verify button changes back to "Follow"

**Result**: Follow/unfollow functionality working correctly! 🎉
