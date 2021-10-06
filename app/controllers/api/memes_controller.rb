class Api::MemesController < ApplicationController
  def create
    file = params[:file]
    ## first we want to save the image to cloudinary -> (url of the image)
    if file
      begin
        cloud_image = Cloudinary::Uploader.upload(file, public_id: file.original_filename, secure: true, resource_type: :auto)
        ## successfully saved to cloudinary
        ## once successfull we want to save to our database
        # cloud_image["secure_url"] this is the url for our image
        meme = Meme.new(text: params[:text], image: cloud_image["secure_url"])
        if meme.save
          # did save to cloudianry and db
          render json: meme
        else
          # did save to cloudianry but not to db
          render json: { errors: meme.errors }, status: 422
        end
      rescue => err
        # did not save to cloudinary
        render json: { errors: err }, status: 422
      end
    end
  end
end
