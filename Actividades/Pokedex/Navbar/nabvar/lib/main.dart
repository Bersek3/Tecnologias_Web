import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_image_compress/flutter_image_compress.dart';
import 'package:carousel_slider/carousel_slider.dart';

class CarouselScreen extends StatelessWidget {
  final List<String> imgList = [
    'assets/images/images1.jpg',
    'assets/images/images2.jpg',
    'assets/images/images3.jpg',
  ];

  @override
  Widget build(BuildContext context) {
    return CarouselSlider(
      options: CarouselOptions(),
      items: imgList
          .map((item) => Container(
                child: Center(
                    child: Image.asset(item, fit: BoxFit.cover, width: 1000)),
              ))
          .toList(),
    );
  }
}

class UserProfileScreen extends StatefulWidget {
  @override
  _UserProfileScreenState createState() => _UserProfileScreenState();
}

class _UserProfileScreenState extends State<UserProfileScreen> {
  File? _image;

  Future getImage() async {
    final pickedFile =
        await ImagePicker().getImage(source: ImageSource.gallery);

    if (pickedFile != null) {
      final dir = await getApplicationDocumentsDirectory();
      final targetPath = dir.absolute.path + "/profile.jpg";
      final targetFile = File(targetPath);

      var file = await FlutterImageCompress.compressAndGetFile(
        pickedFile.path,
        targetPath,
        quality: 88,
      );

      setState(() {
        _image = file;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          CircleAvatar(
            radius: 50,
            backgroundImage: _image == null ? null : FileImage(_image!),
          ),
          TextButton(
            onPressed: getImage,
            style: TextButton.styleFrom(
              primary: Colors.white,
              backgroundColor: Colors.blue,
            ),
            child: Text('Seleccionar imagen de perfil'),
          ),
        ],
      ),
    );
  }
}

// Crear un widget de pestañas y agregar las dos nuevas pantallas a este widget
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: DefaultTabController(
        length: 2,
        child: Scaffold(
          appBar: AppBar(
            bottom: TabBar(
              tabs: [
                Tab(icon: Icon(Icons.collections)),
                Tab(icon: Icon(Icons.account_circle)),
              ],
            ),
            title: Text('carrousel y perfil'),
          ),
          body: TabBarView(
            children: [
              CarouselScreen(),
              UserProfileScreen(),
            ],
          ),
        ),
      ),
    );
  }
}

void main() {
  runApp(MyApp());
}
