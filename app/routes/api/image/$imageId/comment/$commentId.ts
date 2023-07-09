import { type ActionArgs } from "@remix-run/node";
import { deleteComment } from "~/server";

export async function action({ request, params }: ActionArgs) {
  const commentId = params?.commentId || "";
  console.log("Successfully hit Action function!!!!!!!!");

  switch (request.method.toUpperCase()) {
    case "DELETE": {
      const response = await deleteComment(commentId);

      return response;
    }
    case "PATCH": {
      // const formData = await request.formData();
      // const payload = JSON.parse(formData.get("body") as string);
      // const { comment } = payload;
      // const response = await createComment({ imageId, userId, comment });
      // return response;
    }
    default: {
      return {};
    }
  }
}
