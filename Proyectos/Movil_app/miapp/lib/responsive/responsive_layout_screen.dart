import 'package:flutter/material.dart';
import '../providers/user_provider.dart';
import '../utils/dimentions.dart';
import 'package:provider/provider.dart';

class ResponsiveLayout extends StatefulWidget {
  final Widget webSecreenLayout;
  final Widget mobileScreenLayout;

  const ResponsiveLayout(
      {Key? key,
      required this.webSecreenLayout,
      required this.mobileScreenLayout})
      : super(key: key);

  @override
  State<ResponsiveLayout> createState() => _ResponsiveLayoutState();
}

class _ResponsiveLayoutState extends State<ResponsiveLayout> {
  addStates() async {
    UserProvider _userProvider = Provider.of(context, listen: false);
    await _userProvider.refreshUser();
  }

  @override
  void initState() {
    super.initState();
    addStates();
  }

  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        if (constraints.maxWidth > webSecreenSize) {
          return widget.webSecreenLayout;
        } else {
          return widget.mobileScreenLayout;
        }
      },
    );
  }
}
