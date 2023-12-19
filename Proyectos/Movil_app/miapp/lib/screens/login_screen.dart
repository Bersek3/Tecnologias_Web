import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import '../../responsive/responsive_layout_screen.dart';
import '../../screens/register_screen.dart';
import '../../utils/colors.dart';
import '../../widgets/button.dart';
import '../responsive/mobile_screen_layout.dart';
import '../responsive/web_screen_layout.dart';
import '../services/auth_logic.dart';
import '../utils/util_functions.dart';
import '../widgets/text_feild.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool isLoaging = false;

  @override
  void dispose() {
    super.dispose();

    _emailController.dispose();
    _passwordController.dispose();
  }

  final AuthMethodes _authMethodes = AuthMethodes();

  void loginUser() async {
    setState(() {
      isLoaging = true;
    });
    final String email = _emailController.text.trim();
    final String password = _passwordController.text.trim();

    String result = await _authMethodes.loginWithEmailAndPassword(
      email: email,
      password: password,
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
      isLoaging = false;
    });

    print("usuario logeado");
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
                  height: MediaQuery.of(context).size.height * 0.25,
                ),
                Text(
                  'Bienvenido',
                  style: TextStyle(
                    color: Colors.yellow,
                    fontWeight: FontWeight.bold,
                    fontSize: 24,
                  ),
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
                isLoaging
                    ? const CircularProgressIndicator(
                        color: primaryColor,
                      )
                    : CustomButon(
                        text: 'iniciar de sesión',
                        onPressed: loginUser,
                      ),
                const SizedBox(
                  height: 100,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text(
                      'No tienes una cuenta?',
                      style: TextStyle(color: Colors.white),
                    ),
                    TextButton(
                      onPressed: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterScreen(),
                          ),
                        );
                      },
                      child: const Text(
                        'Registrate.',
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
