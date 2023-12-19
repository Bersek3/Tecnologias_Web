import 'package:flutter/material.dart';
import '../models/user.dart';
import '../services/auth_logic.dart';

class UserProvider with ChangeNotifier {
  User? _user;
  final AuthMethodes _authMethodes = AuthMethodes();

  User get getUser => _user!;

  Future<void> refreshUser() async {
    User user = await _authMethodes.getCurrentUser();
    _user = user;

    notifyListeners();
  }
}
