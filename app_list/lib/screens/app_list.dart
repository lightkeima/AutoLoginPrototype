import 'dart:io';
import 'dart:math';
// ignore: import_of_legacy_library_into_null_safe
import 'package:cached_network_image/cached_network_image.dart';
import 'package:udp/udp.dart';

import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:url_launcher/url_launcher.dart';
import 'dart:async';

import '../custom_vertical_card_pager.dart';

class AppListScreen extends StatefulWidget {
  @override
  State<StatefulWidget> createState() => AppListState();
}

class AppListState extends State<AppListScreen>
    with SingleTickerProviderStateMixin {
  late int selected = 0;
  late PageController controller = new PageController();
  late VerticalCardPager pages;
  List<String> appName = [
    "Facebook",
    "Google",
    "Gmail",
    "Netflix",
    "Spotify",
    "Youtube",
    "Twitter",
    "Reddit",
    "Zalo",
    "Instagram",
    "Telegram",
    "Amazon"
  ];
  List<String> appUrl = [
    "https://www.facebook.com/",
    "https://www.google.com/",
    "https://mail.google.com/",
    "https://www.netflix.com/",
    "https://www.spotify.com/us/",
    "https://www.youtube.com/",
    "https://twitter.com/",
    "https://www.reddit.com/",
    "https://zalo.me/pc",
    "https://www.instagram.com/",
    "https://www.telegram.org/",
    "https://amazon.com"
  ];
  List<String> appImageUrl = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2048px-Google_%22G%22_Logo.svg.png",
    "https://www.google.com/gmail/about/static/images/logo-gmail.png",
    "https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png",
    "https://store-images.s-microsoft.com/image/apps.52691.13571498826857201.5bda3835-53b1-4825-ba61-ae335fbbbdd8.2995406a-229c-4a24-ae8a-39af0e795554",
    "https://yt3.ggpht.com/ccPr80rfkOgsE0TMP8S8vEfP85gl12XzUGtySPFFYNMhxlQ62W7ijksmUIXv6fCBC1jBmoEqaA=s900-c-k-c0x00ffffff-no-rj",
    "https://help.twitter.com/content/dam/help-twitter/brand/logo.png",
    "https://media.wired.com/photos/5954a1b05578bd7594c46869/master/w_2560%2Cc_limit/reddit-alien-red-st.jpg",
    "https://stc-zaloprofile.zdn.vn/pc/v1/images/zalo_sharelogo.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png",
    "https://www.wizcase.com/wp-content/uploads/2020/10/Telegram-logo.png",
    "https://znews-stc.zdn.vn/static/topic/company/amazon.png"
  ];
  List<bool> isAWeb = [
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ];
  List<Color> backgroundList = [
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
    Colors.white,
  ];
  static StreamController<int> streamController = new StreamController<int>();

  void t() async {
    streamController.add(-1);
    var receiver = await UDP.bind(
        Endpoint.unicast(InternetAddress("192.168.0.106"), port: Port(4569)));
    await receiver.listen((datagram) async {
      String str = String.fromCharCodes(datagram.data);
      streamController.add(int.parse(str));
    });
  }

  void _launchURL(_url) async => await canLaunch(_url)
      ? await launch(_url)
      : throw 'Could not launch $_url';

  @override
  void initState() {
    super.initState();
    pages = VerticalCardPager(
        textStyle: TextStyle(
            color: Colors.transparent,
            fontWeight: FontWeight.bold,
            fontSize: 0),
        images: listApp(this.context),
        onPageChanged: (page) {
          selected = page!.toInt();
        },
        align: ALIGN.CENTER,
        onSelectedItem: (index) {
          _launchURL(appUrl[index]);
        },
        titles: appName);
    t();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        floatingActionButton: Column(children: []),
        //backgroundColor: Colors.white70,
        body: StreamBuilder<int>(
            stream: streamController.stream, // _bids,
            builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
              if (snapshot.hasData && snapshot.data! != -1) {
                streamController.add(-1);
                if (snapshot.data! == 10) {
                } else if (snapshot.data! == 11) {
                  pages.next();
                } else if (snapshot.data! == 12) {
                  pages.previous();
                } else if (snapshot.data! == 13) {
                  _launchURL(appUrl[selected]);
                }
              }
              return SafeArea(
                  child: Column(children: <Widget>[
                Expanded(child: Container(child: pages))
              ]));
            }));
  }

  @override
  void dispose() {
    super.dispose();
  }

  List<Widget> listApp(context) {
    List<Widget> list = [];
    for (int i = 0; i < isAWeb.length; ++i)
      list.add(Container(
        decoration: BoxDecoration(
          color: backgroundList[i],
          borderRadius: BorderRadius.all(Radius.circular(10)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              spreadRadius: 5,
              blurRadius: 7,
              offset: Offset(0, 3), // changes position of shadow
            ),
          ],
        ),
        child: CachedNetworkImage(
          placeholder: (context, url) => CircularProgressIndicator(),
          imageUrl: appImageUrl[i],
          imageBuilder: (context, imageProvider) => Container(
            decoration: BoxDecoration(
              borderRadius: BorderRadius.all(Radius.circular(10)),
              image: DecorationImage(
                //colorFilter:
                //     ColorFilter.mode(backgroundList[i], BlendMode.colorBurn),
                image: imageProvider,
                fit: BoxFit.cover,
              ),
            ),
          ),
        ),
      ));
    return list;
  }
}
