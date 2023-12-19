import 'dart:typed_data';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../services/firestore_methodes.dart';
import '../../utils/colors.dart';
import '../../utils/util_functions.dart';
import 'package:provider/provider.dart';
import '../../models/user.dart';
import '../../providers/user_provider.dart';

class AddPostScreen extends StatefulWidget {
  const AddPostScreen({super.key});

  @override
  State<AddPostScreen> createState() => _AddPostScreenState();
}

class _AddPostScreenState extends State<AddPostScreen> {
  Uint8List? _file;
  final TextEditingController _descriptionController = TextEditingController();

  bool _isLoading = false;

  _selectImage(BuildContext context) async {
    return showDialog(
        context: context,
        builder: (BuildContext context) {
          return SimpleDialog(
            title: const Text("crear un post"),
            children: [
              SimpleDialogOption(
                padding: EdgeInsets.all(20),
                child: const Text("Tomar una foto"),
                onPressed: () async {
                  Navigator.of(context).pop();

                  Uint8List file = await pickImage(ImageSource.camera);

                  setState(() {
                    _file = file;
                  });
                },
              ),
              SimpleDialogOption(
                padding: EdgeInsets.all(20),
                child: const Text("Escoje de la galeria"),
                onPressed: () async {
                  Navigator.of(context).pop();

                  Uint8List file = await pickImage(ImageSource.gallery);

                  setState(() {
                    _file = file;
                  });
                },
              ),
              SimpleDialogOption(
                padding: EdgeInsets.all(20),
                child: const Text("Cancelar"),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              )
            ],
          );
        });
  }

  void postImage({
    required String uid,
    required String userName,
    required String profileImage,
  }) async {
    setState(() {
      _isLoading = true;
    });
    String res = "a ocurrido un error";

    try {
      res = await FirestoreMethodes().uploadPoast(
          _file!, _descriptionController.text, uid, userName, profileImage);

      if (res == "success") {
        setState(() {
          _isLoading = false;
        });

        showSnakBar(context, "posteado con exito");

        clearImage();
      } else {
        setState(() {
          _isLoading = false;
        });
        showSnakBar(context, res);
      }
    } catch (error) {
      showSnakBar(context, error.toString());
    }
  }

  void clearImage() {
    setState(() {
      _file = null;
    });
  }

  @override
  void dispose() {
    super.dispose();
    _descriptionController.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final User user = Provider.of<UserProvider>(context).getUser;

    return _file == null
        ? Column(
            mainAxisAlignment: MainAxisAlignment.spaceAround,
            children: [
              Text(
                'Crear un Post',
                style: TextStyle(
                  color: Color(0xFFFFEB3B),
                  fontWeight: FontWeight.bold,
                  fontSize: 24,
                ),
              ),
              Center(
                child: Column(
                  children: [
                    IconButton(
                      onPressed: () => _selectImage(context),
                      icon: const Icon(
                        Icons.upload,
                        color: mainYellowColor,
                        size: 50,
                      ),
                    ),
                    Padding(
                      padding: const EdgeInsets.all(8.0),
                      child: const Text("Selecciona una imagen para postear"),
                    ),
                  ],
                ),
              ),
            ],
          )
        : Scaffold(
            appBar: AppBar(
              backgroundColor: mobileBackgroundColor,
              leading: IconButton(
                  icon: const Icon(Icons.arrow_back), onPressed: clearImage),
              title: const Text(
                "Crear un Post",
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                ),
              ),
              centerTitle: false,
              actions: [
                TextButton(
                  onPressed: () => postImage(
                    profileImage: user.profilePic,
                    uid: user.uid,
                    userName: user.userName,
                  ),
                  child: const Text(
                    "Postear",
                    style: TextStyle(
                      color: Color(0xFF2196F3),
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            body: SingleChildScrollView(
              child: Column(
                children: [
                  _isLoading
                      ? const LinearProgressIndicator()
                      : Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Container(),
                        ),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceAround,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(
                        backgroundImage: NetworkImage(user.profilePic),
                      ),
                      SizedBox(
                        width: MediaQuery.of(context).size.width * 0.6,
                        child: TextField(
                          controller: _descriptionController,
                          decoration: const InputDecoration(
                            hintText: "Escribe una descripción..",
                            border: InputBorder.none,
                          ),
                          maxLines: 8,
                        ),
                      ),
                      Divider(
                        color: secondaryColor,
                      ),
                    ],
                  ),
                  Container(
                    width: double.infinity,
                    child: AspectRatio(
                      aspectRatio: 1 / 1,
                      child: Container(
                        decoration: BoxDecoration(
                          image: DecorationImage(
                            image: MemoryImage(_file!),
                            fit: BoxFit.cover,
                            alignment: FractionalOffset.topCenter,
                          ),
                        ),
                      ),
                    ),
                  ),
                ],
              ),
            ));
  }
}
