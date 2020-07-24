import React, { memo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PlatformColor,
  Image,
  TouchableOpacity,
} from 'react-native';

export type IPost = {
  user: {
    id: number;
    avatarUrl: string;
  };
  id: number;
  title: string;
  body: {
    text: string;
    imageUrl?: string;
  };
};

export default function PostView({ data }: { data: IPost }) {
  return (
    <View style={styles.container}>
      <View style={styles.avatarColumn}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: data.user.avatarUrl }} style={styles.avatar} />
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{data.title.slice(0, 16)}</Text>
        <Text>{data.body.text}</Text>
        {data.body.imageUrl ? (
          <PostImage imageUrl={data.body.imageUrl} />
        ) : null}
        <PostButtons postId={data.id} />
      </View>
    </View>
  );
}

function PostImage({ imageUrl }: { imageUrl: string }) {
  return (
    <View style={styles.postImageContainer}>
      <Image source={{ uri: imageUrl }} style={styles.postImage} />
    </View>
  );
}

function PostButtonsImpl({ postId }: { postId: IPost['id'] }) {
  const pressHandler = (btn: string) => {
    console.log(`${btn}_${postId}`);
  };

  return (
    <View style={styles.buttonsContainer}>
      {['comment', 'retweet', 'like', 'share'].map((btn) => (
        <TouchableOpacity
          key={btn}
          hitSlop={{ left: 8, right: 8 }}
          onPress={pressHandler.bind(null, btn)}>
          <Image source={{ uri: btn }} style={styles.buttonIcon} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const PostButtons = memo(PostButtonsImpl, (prev, next) => {
  return prev.postId === next.postId;
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: PlatformColor('separatorColor'),
  },
  avatarColumn: {
    marginRight: 8,
  },
  avatarContainer: {
    height: 40,
    width: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: PlatformColor('systemGray3'),
  },
  avatar: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
  },
  title: {
    fontWeight: '600',
    marginBottom: 4,
  },
  postImageContainer: {
    flex: 1,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: PlatformColor('systemBrown'),
    overflow: 'hidden',
  },
  postImage: {
    height: 160,
    width: '100%',
    resizeMode: 'cover',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 24,
    marginTop: 12,
  },
  buttonIcon: {
    height: 16,
    width: 16,
    resizeMode: 'contain',
    tintColor: PlatformColor('systemGray2'),
  },
});
