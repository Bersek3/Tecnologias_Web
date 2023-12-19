import 'dart:typed_data';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:uuid/uuid.dart';

class StorageMethodes {
  final FirebaseStorage _storage = FirebaseStorage.instance;
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<String> uploadImage(
      String floderName, bool isPost, Uint8List file) async {
    Reference ref =
        _storage.ref().child(floderName).child(_auth.currentUser!.uid);

    if (isPost) {
      String postId = const Uuid().v4();
      ref = ref.child(postId);
    }

    UploadTask uploadTask = ref.putData(file);

    TaskSnapshot snapshot = await uploadTask;
    String downloadUrl = await snapshot.ref.getDownloadURL();

    return downloadUrl;
  }
}
