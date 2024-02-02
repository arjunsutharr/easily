function deleteJob(jobId) {
  const result = confirm("Are you sure you want to remove this job?");

  if (result) {
    fetch("/delete-job/" + jobId, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          // location.reload();
          window.location.href = "/jobs";
        }
      })
      .catch((err) => {
        console.error("Error deleting job:", err);
      });
  }
}

// .then((res) => {
//     // window.location.href = "/jobs";
//     location.reload();
//   })
//   .catch((err) => {
//     console.error("Error deleting job:", err);
//   });
