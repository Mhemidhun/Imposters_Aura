


// export const useAddCategory = ()=>{
//       const {
//          register,
//          handleSubmit,
//          reset,
//          setValue,
//          formState: { errors },
//        } = useForm<CategoryFormValues>({
//          resolver: zodResolver(categorySchema),
//        });
     
//        const [previewImage, setPreviewImage] = useState<string | null>(null);
     
//        // Handle image selection
//        const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//          const file = event.target.files?.[0];
//          if (file) {
//            setValue("image", file); // Set file in form
//            setPreviewImage(URL.createObjectURL(file)); // Create preview
//          }
//        };
     
//        // Form submission
//        const onSubmit = (data: CategoryFormValues) => {
//          console.log("Submitted Data:", data);
//          reset(); // Reset form after submission
//          setPreviewImage(null);
//          onClose(); // Close modal after submission
//        };
// }