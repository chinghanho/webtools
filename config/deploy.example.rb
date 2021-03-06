set :application, "webtools"
set :user, "username"
set :domain, ""
# ssh_options[:keys] = ["~/.ssh/keypair.pem"]

set :scm, :git
set :repository,  "git@github.com:chinghanho/webtools-frontend.git"
set :branch, "master"

set :deploy_to, "/home/#{user}/#{application}"
set :keep_releases, 5
set :use_sudo, false
set :normalize_asset_timestamps, false
default_run_options[:pty] = true

role :app, domain                   # This may be the same as your `Web` server

namespace :deploy do

  task :assets, :roles => :app do
    top.upload("./dist", "#{shared_path}/dist", :via => :scp, :recursive => :true)
  end

end

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"
