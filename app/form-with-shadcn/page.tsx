'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import toast from 'react-hot-toast'

type TFormSchema = z.infer<typeof FormSchema>

const FormSchema = z.object({
  firstName: z.string().min(1, {
    message: 'firstname must be up 1 character length'
  }).max(128, {
    message: 'firstname must be less then 128 character length'
  }),
  lastName: z.string().min(1, {
    message: 'lastname must be up 1 character length'
  }).max(128, {
    message: 'lastname must be less then 128 character length'
  }),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string()
}).required().refine((data) => data.password === data.confirmPassword, {
  message: 'Password don\'t match',
  path: ['confirmPassword']
})

export default function Page() {
  const form = useForm<TFormSchema>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    }
  })

  const promiseFn = () => new Promise((resolve) => setTimeout(() => resolve(true), 1000))

  const onSubmit = async (data: TFormSchema) => {
    await toast.promise(
      promiseFn(),
      {
        loading: <span className='text-lg text-muted'>Creating account..</span>,
        success: (
          <div className='max-w-xl'>
            <h3 className='mb-8 font-bold text-lg tracking-tighter'>Account Created</h3>
            <SyntaxHighlighter language='json' style={dark}>{JSON.stringify(data, null, 2)}</SyntaxHighlighter>
          </div>
        ),
        error: <span className='text-lg text-muted'>Something went error..</span>
      },
      {
        duration: 6000
      }
    )
    form.reset()
  }

  return (
    <div className='max-w-lg p-4 mx-auto mt-16'>
      <h2 className='text-3xl font-bold tracking-tighter text-center'>Create Account.</h2>
      <div className='pt-16'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Firstname</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Firstname..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Lastname</FormLabel>
                    <FormControl>
                      <Input type='text' placeholder='Lastname..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
              />
            </div>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) =>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='Email..' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }
            />
            <div className='flex gap-4'>
              <FormField
                control={form.control}
                name='password'
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Password..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
              />
              <FormField
                control={form.control}
                name='confirmPassword'
                render={({ field }) =>
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <Input type='password' placeholder='Confirm password..' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                }
              />
            </div>
            <div className='ml-auto space-x-4 w-max'>
              <Button type='button' variant={'outline'} size={'lg'} onClick={() => form.reset()}>Reset</Button>
              <Button type='submit' size={'lg'}>Create account.</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}