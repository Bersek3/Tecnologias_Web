import 'dart:typed_data';

import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:image_picker/image_picker.dart';
import '../../screens/login_screen.dart';
import '../../utils/colors.dart';
import '../../utils/util_functions.dart';
import '../../widgets/button.dart';

import '../responsive/mobile_screen_layout.dart';
import '../responsive/responsive_layout_screen.dart';
import '../responsive/web_screen_layout.dart';
import '../services/auth_logic.dart';
import '../widgets/text_feild.dart';

class RegisterScreen extends StatefulWidget {
  const RegisterScreen({super.key});

  @override
  State<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _bioController = TextEditingController();
  final TextEditingController _userNameController = TextEditingController();
  Uint8List? _profileImage;
  bool isLoading = false;

  final AuthMethodes _authMethodes = AuthMethodes();

  void registerUser() async {
    setState(() {
      isLoading = true;
    });

    String email = _emailController.text.trim();
    String password = _passwordController.text.trim();
    String bio = _bioController.text.trim();
    String userName = _userNameController.text.trim();

    String result = await _authMethodes.registerWithEmailAndPassword(
      email: email,
      password: password,
      userName: userName,
      bio: bio,
      profilePic: _profileImage!,
    );

    if (result == "Correo ya esta en uso" ||
        result == "Contraseña Incorrecta" ||
        result == "Correo Invalido") {
      showSnakBar(context, result);
    } else if (result == 'Ingreso Exitoso') {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (context) => const ResponsiveLayout(
            webSecreenLayout: WebScreenlayout(),
            mobileScreenLayout: MobileScreenLayout(),
          ),
        ),
      );
    }
    setState(() {
      isLoading = false;
    });
  }

  @override
  void dispose() {
    super.dispose();

    _emailController.dispose();
    _passwordController.dispose();
    _bioController.dispose();
    _userNameController.dispose();
  }

  void selectImage() async {
    Uint8List _profileImage = await pickImage(ImageSource.gallery);
    setState(() {
      this._profileImage = _profileImage;
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: SingleChildScrollView(
          child: Container(
            height: MediaQuery.of(context).size.height,
            padding: const EdgeInsets.symmetric(horizontal: 32),
            width: double.infinity,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  height: MediaQuery.of(context).size.height * 0.1,
                ),
                Text(
                  'Registrarse',
                  style: TextStyle(
                    color: Colors.yellow,
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                  ),
                ),
                Stack(
                  children: [
                    _profileImage != null
                        ? CircleAvatar(
                            radius: 50,
                            backgroundColor: Colors.grey[300],
                            backgroundImage: MemoryImage(_profileImage!),
                          )
                        : CircleAvatar(
                            radius: 50,
                            backgroundColor: Colors.grey[300],
                            backgroundImage: const NetworkImage(
                                'https://1fid.com/wp-content/uploads/2022/06/cartoon-profile-picture-12-1024x1024.jpg'),
                          ),
                    Positioned(
                      bottom: 0,
                      right: 0,
                      child: Container(
                        height: 40,
                        width: 40,
                        decoration: BoxDecoration(
                          color: Colors.white70,
                          borderRadius: BorderRadius.circular(30),
                        ),
                        child: IconButton(
                          onPressed: selectImage,
                          icon: Icon(
                            Icons.add_a_photo,
                            color: Colors.yellow.shade600,
                          ),
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFeildInput(
                  hintText: 'Ingresa tu correo',
                  controller: _emailController,
                  isPassword: false,
                  inputkeyboardType: TextInputType.emailAddress,
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFeildInput(
                  hintText: 'Ingresa tu contraseña',
                  controller: _passwordController,
                  isPassword: true,
                  inputkeyboardType: TextInputType.visiblePassword,
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFeildInput(
                  hintText: 'Ingresa tu username',
                  controller: _userNameController,
                  isPassword: false,
                  inputkeyboardType: TextInputType.name,
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFeildInput(
                  hintText: 'Escribe tu bio',
                  controller: _bioController,
                  isPassword: false,
                  inputkeyboardType: TextInputType.text,
                ),
                const SizedBox(
                  height: 30,
                ),
                isLoading
                    ? const CircularProgressIndicator(
                        color: primaryColor,
                      )
                    : CustomButon(
                        text: 'Registarse',
                        onPressed: registerUser,
                      ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'Ya tienes una cuenta?',
                      style: TextStyle(color: Colors.white),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const LoginScreen(),
                          ),
                        );
                      },
                      child: const Text(
                        'Loguearse',
                        style: TextStyle(color: Colors.white),
                      ),
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
