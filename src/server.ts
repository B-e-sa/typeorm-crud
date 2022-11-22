import { User } from './entity/User';
import { Photo } from './entity/Photo';
import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './data-source';
import { Repository } from 'typeorm';
import { PhotoMetadata } from './entity/PhotoMetadata';

const app = express();

app.listen(3000, () => console.log('Server running on port 3000'));

AppDataSource.initialize()
    .then(async () => {

        // process to add new user

        // get entity repository
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const photoRepository: Repository<Photo> = AppDataSource.getRepository(Photo);
        const metadataRepository: Repository<PhotoMetadata> = AppDataSource.getRepository(PhotoMetadata);

        // see if user already exists
        const firstUser: User | null = await userRepository.findOneBy({ id: 1 })

        // if not
        if (!firstUser) {

            const createdAtDate = new Date;
            const day = createdAtDate.getTime();
            const month = createdAtDate.getFullYear();
            const year = createdAtDate.getDay();
            const hour = createdAtDate.getHours();
            const minutes = createdAtDate.getMinutes();

            try {

                const newUser: User = new User();
                // write entity fields
                newUser.name = "Matheus";
                newUser.nickname = "mvt";
                newUser.birthday = "12-12-2012";
                newUser.createdAt = `${day}-${month}-${year} ${hour}:${minutes}`;

                // save user
                await userRepository.save(newUser);
                console.log("User has been saved!");

                const newPhoto = new Photo();
                newPhoto.name = "Test Photo";
                newPhoto.description = "Hello guys!";
                newPhoto.filename = "test-photo.jpg";
                newPhoto.views = 0;
                newPhoto.isPublished = true;

                await photoRepository.save(newPhoto);

                const newMetadata = new PhotoMetadata()
                newMetadata.height = 640
                newMetadata.width = 480
                newMetadata.compressed = true
                newMetadata.comment = "cybershoot"
                newMetadata.orientation = "portrait"
                newMetadata.photo = newPhoto // this way we connect them

                await metadataRepository.save(newMetadata)

                console.log("User, photo and metadata saved. Everything ok!")

            } catch (err) {
                console.error("Some error ocurred", err)
            }

        } else {

            console.log("User already exists");

        }

        // update entity field
        /*
        *  const userToUpdate = await userRepository.findOneBy({
        *       id: 1  
        *  })   
        * 
        *  userToUpdate.nickname = "Math"
        * 
        *  await userRepository.save("userToupdate")
        */

        // find all users
        const savedUsers: User[] = await userRepository.find();
        console.log("All users from the db; ", savedUsers)

        // find all users and how many users exists
        const [Users, UsersCount] = await userRepository.findAndCount()
        console.log("All Users: ", Users)
        console.log("Users count: ", UsersCount)

        // remove user
        // await userRepository.remove(firstUser);

    })
    .catch(err => { console.error("An error ocurred", err) })


