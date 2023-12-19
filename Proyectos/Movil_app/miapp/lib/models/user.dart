class User {
  final String uid;
  final String email;
  final String userName;
  final String bio;
  final String profilePic;
  final List followers;
  final List following;

  User({
    required this.uid,
    required this.email,
    required this.userName,
    required this.bio,
    required this.profilePic,
    required this.followers,
    required this.following,
  });

  Map<String, dynamic> toJSON() {
    return {
      'uid': uid,
      'email': email,
      'userName': userName,
      'bio': bio,
      'profilePic': profilePic,
      'followers': followers,
      'following': following,
    };
  }

  factory User.fromJSON(Map<String, dynamic> json) {
    return User(
      uid: json['uid'],
      email: json['email'],
      userName: json['userName'],
      bio: json['bio'],
      profilePic: json['profilePic'],
      followers: json['followers'],
      following: json['following'],
    );
  }
}
