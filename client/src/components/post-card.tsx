import React from "react";
import { Post } from "../../../shared/index";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const PostCard: React.FC<Post> = (post) => {
  return (
    <Box>
      <Flex align="center" gap={2} marginLeft={5}>
        <Text fontSize="md" fontWeight="bold" color="gray.600">
          {post.title}
        </Text>
        <Text fontWeight="bold" color="gray.400">
          {post.url}
        </Text>
        <Text>
          <Link to={`/p/${post.id}`}>
            <Button variant="outline" size="sm" color="gray.400">
              Comments
            </Button>
          </Link>
        </Text>
      </Flex>
    </Box>
  );
};
