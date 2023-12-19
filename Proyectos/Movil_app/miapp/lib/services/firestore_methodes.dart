import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import '../../services/storage_methodes.dart';
import 'package:uuid/uuid.dart';

import '../models/post.dart';

class FirestoreMethodes {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<String> uploadPoast(
    Uint8List file,
    String description,
    String uid,
    String userName,
    String profileImage,
  ) async {
    String res = "some error occured";
    try {
      String photoURL =
          await StorageMethodes().uploadImage("posts", true, file);

      String postId = const Uuid().v4();

      Post post = Post(
        description: description,
        uid: uid,
        userName: userName,
        postId: postId,
        datePosted: DateTime.now(),
        postURL: photoURL,
        profilePic: profileImage,
        likes: [],
      );

      _firestore.collection('posts').doc(postId).set(post.toJSON());

      res = "success";
    } catch (error) {
      res = error.toString();
    }

    return res;
  }

  Future<void> likePosts(
      {required String postID,
      required String uid,
      required List likes}) async {
    try {
      if (likes.contains(uid)) {
        await _firestore.collection('posts').doc(postID).update({
          'likes': FieldValue.arrayRemove([uid]),
        });
      } else {
        await _firestore.collection('posts').doc(postID).update({
          'likes': FieldValue.arrayUnion([uid]),
        });
      }
    } catch (error) {
      if (kDebugMode) {
        print(error.toString());
      }
    }
  }

  Future<void> deletePost(
      {required String postId, required String currentUserUid}) async {
    try {
      DocumentSnapshot postSnapshot =
          await _firestore.collection('posts').doc(postId).get();
      if (postSnapshot.exists) {
        Map<String, dynamic> postData =
            postSnapshot.data() as Map<String, dynamic>;

        if (postData['ownerUid'] == currentUserUid) {
          await _firestore.collection('posts').doc(postId).delete();
        } else {
          print("No tienes permiso para eliminar este post");
        }
      }
    } catch (error) {
      print(error.toString());
    }
  }

  Future<void> followUser(String uid, String followId) async {
    try {
      DocumentSnapshot snap =
          await _firestore.collection('users').doc(uid).get();
      List following = (snap.data()! as dynamic)['following'];

      if (following.contains(followId)) {
        await _firestore.collection('users').doc(followId).update({
          'followers': FieldValue.arrayRemove([uid])
        });

        await _firestore.collection('users').doc(uid).update({
          'following': FieldValue.arrayRemove([followId])
        });
      } else {
        await _firestore.collection('users').doc(followId).update({
          'followers': FieldValue.arrayUnion([uid])
        });

        await _firestore.collection('users').doc(uid).update({
          'following': FieldValue.arrayUnion([followId])
        });
      }
    } catch (e) {
      if (kDebugMode) print(e.toString());
    }
  }
}
