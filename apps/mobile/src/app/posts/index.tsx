import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Button,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { api } from "../../trpc";

export default function Home() {
  const { data: posts } = api.getPosts.useQuery();
  const { mutate: createPost } = api.createPost.useMutation();
  const utils = api.useUtils();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");

  const handleCreatePost = () => {
    if (newTitle && newContent)
      createPost(
        { title: newTitle, content: newContent },
        {
          onSuccess: () => {
            utils.getPosts.invalidate();
            setNewTitle("");
            setNewContent("");
          },
        }
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.postsContainer}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Post post={item} />}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={newTitle}
        onChangeText={setNewTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={newContent}
        onChangeText={setNewContent}
      />
      <Button title="Create Post" onPress={handleCreatePost} />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Post({
  post,
}: {
  post: { title: string; content: string; id: string };
}) {
  const utils = api.useUtils();
  const { mutate: deletePost } = api.deletePost.useMutation({
    onSuccess: () => {
      utils.getPosts.invalidate();
    },
  });

  return (
    <View style={styles.postContainer}>
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postContent}>{post.content}</Text>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deletePost({ id: post.id })}
      >
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  postsContainer: {
    width: "90%",
  },
  postContainer: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  postContent: {
    fontSize: 14,
  },
  deleteButton: {
    alignSelf: "flex-end",
  },
  input: {
    width: "90%",
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 5,
  },
});
