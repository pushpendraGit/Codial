const User = require("../models/user");
const Friendships = require("../models/friendships");

module.exports.toggleFriend = async function (req, res) {
  try {
    let isFriend = await Friendships.findOne({
      $or: [
        {
          $and: [
            {
              user_id: req.user._id,
              friend_id: req.params.id,
            },
          ],
        },
        {
          $and: [
            {
              friend_id: req.user._id,
              user_id: req.params.id,
            },
          ],
        },
      ],
    });

    let user = await User.findById(req.user._id);
    let friendId = await User.findById(req.params.id);

    if (isFriend) {
      // console.log("Already Friends");
      await user.updateOne({
        $pull: {
          friends: isFriend._id,
        },
      });
      await friendId.updateOne({
        $pull: {
          friends: isFriend._id,
        },
      });
      user.save();
      friendId.save();
      isFriend.remove();
      // console.log("No More Friends :(");
      req.flash("success", "Friend removed");
      return res.redirect("back");
    } else {
      let friend = await Friendships.create({
        user_id: req.user.id,
        friend_id: req.params.id,
      });

      friendId.friends.push(friend);
      user.friends.push(friend);

      user.save();
      friendId.save();
      req.flash("success", "Friend request Sent");
      return res.redirect("back");
    }
  } catch (err) {
    req.flash("error", "Some Error Ocurred");
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.renderPage = async function (req, res) {
  try {
    let friends = await Friendships.find({
      $or: [
        {
          friend_id: req.user._id,
        },
        {
          user_id: req.user._id,
        },
      ],
      request_accepted: true,
    })
      .populate({
        path: "friend_id",
        model: "User",
      })
      .populate({
        path: "user_id",
        model: "User",
      });
    // console.log(friends);
    return res.render("friends.ejs", {
      title: "My Friends",
      friends: friends,
    });
  } catch (err) {
    console.log(err);
    return res.redirect("/");
  }
};

module.exports.friendRequests = async function (req, res) {
  // console.log("This page will show all the friend requsts");
  let friends = await Friendships.find({
    // friend_id : req.user._id,

    $and: [
      {
        friend_id: req.user._id,
      },
      {
        request_accepted: false,
      },
    ],
  }).populate({
    path: "user_id",
    model: "User",
  });
  // friends = await friends.populate('user', 'name avatar').execPopulate();

  return res.render("friend_requests.ejs", {
    title: "Friend Requests",
    friendRequests: friends,
  });
};

module.exports.requestAccepted = async function (req, res) {
  console.log("Done!!!", req.params);
  let friend = await Friendships.findById(req.params.id);
  console.log(friend);
  await friend.update({
    request_accepted: true,
  });
  return res.redirect("/");
};
