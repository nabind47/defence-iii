import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { getFeedbacks, giveFeedbacks } from "../../api";
import Loading from "../Loading";

// eslint-disable-next-line react/prop-types
function FeedbackForm({ spotId }) {
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: giveFeedbacks,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["spots", spotId, "feedbacks"],
      });
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["spots", spotId, "feedbacks"],
    queryFn: () => getFeedbacks(spotId),
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({ spotId, message });
  };

  return (
    <div className=" w-half  mt-8 px-6 py-6  bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-sm font-semibold mb-1"
            htmlFor="feedback"
          >
            Place your Feedback
          </label>
          <textarea
            id="feedback"
            name="feedback"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-md resize-none"
            placeholder="Enter your feedback"
          />
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-green-600"
        >
          Submit
        </button>
      </form>

      {data.data.map((f) => (
        <div key={f._id} className="flex items-center gap-2">
          <h3 className="font-semibold">{f.user.name}</h3>
          <span>: {f.message}</span>
        </div>
      ))}
    </div>
  );
}

export default FeedbackForm;
