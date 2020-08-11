<template>
  <form class="profile-form my-5">
    <div class="form-group">
      <label for="acutalPassword">Acutal Password</label>
      <input type="password" class="form-control" id="acutalPassword" placeholder="Acutal Password">
    </div>
    <div class="form-group">
      <label for="newPassword">New Password</label>
      <input type="password" class="form-control" id="newPassword" placeholder="New Password">
    </div>
    <div class="form-group">
      <label for="repeatPassword">Repeat Password</label>
      <input type="password" class="form-control" id="repeatPassword" placeholder="Repeat Password">
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" class="form-control" id="email" placeholder="email@host.com">
    </div>
    <div class="form-group">
      <label for="fullName">Full Name</label>
      <input type="email" class="form-control" id="fullName" placeholder="Max Mustermann">
    </div>
    <button type="submit" class="btn btn-primary btn-block my-3">Submit</button>
  </form>
</template>

<script>

export default {}
</script>
