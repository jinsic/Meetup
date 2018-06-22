import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  ScrollView,
  Text,
  View,
  FlatList,
  InteractionManager,
} from 'react-native';

import { ratio, colors } from '@utils/Styles';
import { IC_MASK } from '@utils/Icons';

import { getString } from '@STRINGS';
import User from '@models/User';
import Button from '@shared/Button';
import { inject } from 'mobx-react/native';
import appStore from '@stores/appStore';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 140 * ratio,
    color: 'white',
    fontSize: 28 * ratio,
  },
  btnBottomWrapper: {
    position: 'absolute',
    bottom: 16 * ratio,
  },
  btnLogin: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    borderRadius: 4 * ratio,
    borderWidth: 2 * ratio,
    width: 320 * ratio,
    height: 52 * ratio,
    borderColor: 'white',

    alignItems: 'center',
    justifyContent: 'center',
  },
  txtLogin: {
    fontSize: 14 * ratio,
    color: 'white',
  },
  imgBtn: {
    width: 24 * ratio,
    height: 24 * ratio,
    position: 'absolute',
    left: 16 * ratio,
  },
  viewUser: {
    marginTop: 40 * ratio,
    alignItems: 'center',
  },
  txtUser: {
    fontSize: 16 * ratio,
    color: '#eee',
    lineHeight: 48,
  },
});

interface IState {
  isLoggingIn: boolean;
}

@observer
class Page extends Component<any, IState> {
  private timer: any;

  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    };
  }

  public componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleTxt}>Sample</Text>
        <View style={styles.viewUser}>
          <Text style={styles.txtUser}>{appStore.user.displayName}</Text>
          <Text style={styles.txtUser}>{appStore.user.age}</Text>
          <Text style={styles.txtUser}>{appStore.user.job}</Text>
        </View>
        <View style={styles.btnBottomWrapper}>
          <Button
            isLoading={this.state.isLoggingIn}
            onPress={this.onLogin}
            style={styles.btnLogin}
            textStyle={styles.txtLogin}
            imgLeftSrc={IC_MASK}
            imgLeftStyle={styles.imgBtn}
          >{getString('LOGIN')}</Button>
        </View>
      </View>
    );
  }

  private onLogin = () => {
    if (!appStore.user) {
      appStore.user = new User();
    }
    this.setState({ isLoggingIn: true }, () => {
      this.timer = setTimeout(() => {
        appStore.user.displayName = 'dooboolab';
        console.log(`appStore.user.age: ${appStore.user.age}`);
        if (appStore.user.age === 30) {
          appStore.user.age = appStore.user.age + 1;
        } else {
          appStore.user.age = 30;
        }
        appStore.user.job = 'developer';
        this.setState({ isLoggingIn: false });
      }, 1000);
    });
  }
}

export default Page;
