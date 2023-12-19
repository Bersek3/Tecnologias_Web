import 'package:firebase_auth/firebase_auth.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';
import '../../services/storage_methodes.dart';
import '../../models/user.dart' as user_model;

class AuthMethodes {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  Future<user_model.User> getCurrentUser() async {
    User currentUser = _auth.currentUser!;
    DocumentSnapshot snapshot =
        await _firestore.collection('users').doc(currentUser.uid).get();

    return user_model.User.fromJSON(snapshot.data() as Map<String, dynamic>);
  }

  Future<String> registerWithEmailAndPassword({
    required String email,
    required String password,
    required String userName,
    required String bio,
    required Uint8List profilePic,
  }) async {
    String res = "An error occured";

    try {
      if (userName.isNotEmpty &&
          password.isNotEmpty &&
          userName.isNotEmpty &&
          bio.isNotEmpty &&
          profilePic.isNotEmpty) {
        final UserCredential userCredential = await _auth
            .createUserWithEmailAndPassword(email: email, password: password);

        String photoURL = await StorageMethodes()
            .uploadImage("ProfileImages", false, profilePic);

        user_model.User user = user_model.User(
          uid: userCredential.user!.uid,
          email: email,
          userName: userName,
          bio: bio,
          profilePic: photoURL,
          followers: [],
          following: [],
        );

        if (userCredential.user != null) {
          await _firestore
              .collection('users')
              .doc(userCredential.user!.uid)
              .set(
                user.toJSON(),
              );

          res = "success";
        }
      }
    } on FirebaseAuthException catch (error) {
      if (error.code == "invalid-email") {
        res = "Invalid email";
      } else if (error.code == "weak-password") {
        res = "Weak password";
      } else if (error.code == "email-already-in-use") {
        res = "Email already in use";
      }
    } catch (error) {
      res = error.toString();
    }

    return res;
  }

  Future<String> loginWithEmailAndPassword({
    required String email,
    required String password,
  }) async {
    String res = "An error occured";

    try {
      if (email.isNotEmpty && password.isNotEmpty) {
        await _auth.signInWithEmailAndPassword(
            email: email, password: password);

        res = "success";
      } else {
        res = "Please enter email and password";
      }
    } on FirebaseAuthException catch (error) {
      if (error.code == "invalid-email") {
        res = "Invalid email";
      } else if (error.code == "weak-password") {
        res = "Weak password";
      } else if (error.code == "email-already-in-use") {
        res = "Email already in use";
      }
    } catch (error) {
      res = error.toString();
    }

    return res;
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
